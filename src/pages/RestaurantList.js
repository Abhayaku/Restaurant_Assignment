//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    TextInput,
    Image,
    Keyboard,
} from 'react-native';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import { UIActivityIndicator } from 'react-native-indicators';
import { heightsize, widthsize } from '../constant/Dimension';

const key = 'AIzaSyDkGIvqAXuuOE5TUoDedazelbPdKtQxb1E';
const restaurant_list_url =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant';

// create  component
class ResturantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            searchlist: [],
            loader: true,
            search: false,
            searchloading: false,
            keyword: '',
        };
    }

    componentDidMount = () => {
        fetch(`${restaurant_list_url}&key=${key}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                for (var i of responseJson.results) {
                    this.setState(prevState => ({
                        list: [...prevState.list, i],
                    }));
                }
                setTimeout(() => {
                    this.setState({ loader: false });
                }, 1000);
            })
            .catch(error => {
                console.error(error);
            });
    };

    search = value => {
        if (value.length > 0) {
            this.setState({ search: true, searchloading: true });
        } else {
            Keyboard.dismiss();
            this.setState({ search: false });
        }
        this.setState({ keyword: value });
        fetch(`${restaurant_list_url}&keyword=:${value}&key=${key}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                for (var i of responseJson.results) {
                    this.setState(prevState => ({
                        searchlist: [...prevState.searchlist, i],
                    }));
                }
                setTimeout(() => {
                    this.setState({ searchloading: false });
                }, 100);
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.loader == true ? (
                    <View style={styles.loader}>
                        <UIActivityIndicator color="black" count={8} size={widthsize * 7 / 100} />
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {/* serch container */}
                        <View style={styles.searchcontiner}>
                            <View style={styles.rowcontainer}>
                                <SearchIcon name="search" style={styles.searchicon} />
                                <TextInput
                                    placeholder="Search here..."
                                    placeholderTextColor="#8c8c8c"
                                    value={this.state.keyword}
                                    onChangeText={value => this.search(value)}
                                    style={styles.textinput}
                                />
                            </View>
                        </View>

                        {/* divider */}
                        <View style={styles.divider} />

                        {/* list container */}
                        <View style={{ flex: 1 }}>
                            {this.state.search == true ? (
                                <View style={{ flex: 1 }}>
                                    {this.state.searchloading == true ? (
                                        <View
                                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.subtitle}>Searching...</Text>
                                        </View>
                                    ) : (
                                        <View style={{ flex: 1 }}>
                                            <FlatList
                                                contentInsetAdjustmentBehavior='automatic'
                                                keyboardShouldPersistTaps='always'
                                                data={this.state.searchlist}
                                                renderItem={({ item }) => (
                                                    <View>
                                                        {/* restaurant container */}
                                                        <TouchableOpacity
                                                            delayPressIn={0}
                                                            activeOpacity={0.6}
                                                            onPress={() => {
                                                                this.setState({ search: false, keyword: '' });
                                                                this.props.navigation.navigate('RestaurantDetails', {
                                                                    item: item,
                                                                });
                                                            }}
                                                            style={styles.searchrestaurantcontainer}>
                                                            {/* restaurant image container */}
                                                            {item.photos == undefined ? (
                                                                <Image
                                                                    source={{
                                                                        uri: `https://b.zmtcdn.com/images/placeholder_200.png`,
                                                                    }}
                                                                    style={styles.searchrestaurantimage}></Image>
                                                            ) : (
                                                                <Image
                                                                    source={{
                                                                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&sensor=false&key=${key}`,
                                                                    }}
                                                                    style={styles.searchrestaurantimage}></Image>
                                                            )}

                                                            {/* restaurant details */}
                                                            <View style={{ marginLeft: widthsize * 5 / 100 }}>
                                                                <Text style={styles.searchtitle}>
                                                                    {item.name}
                                                                </Text>
                                                                <Text style={styles.searchsubtitle}>
                                                                    {item.vicinity}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        contentInsetAdjustmentBehavior='automatic'
                                        data={this.state.list}
                                        renderItem={({ item }) => (
                                            <View>
                                                {/* result view */}
                                                <View
                                                    style={[
                                                        styles.resultcontainer,
                                                        {
                                                            display:
                                                                item.name == 'Mayflower Park' ? 'flex' : 'none',
                                                        },
                                                    ]}>
                                                    <Text style={styles.resultcontainertext}>
                                                        {this.state.list.length} restaurant around you
                                                    </Text>
                                                </View>

                                                {/* restaurant container */}
                                                <TouchableOpacity
                                                    delayPressIn={0}
                                                    activeOpacity={0.6}
                                                    onPress={() => this.props.navigation.navigate('RestaurantDetails', {
                                                        item: item,
                                                    })}
                                                    style={styles.restaurantcontainer}>
                                                    {/* restaurant image container */}
                                                    {item.photos == undefined ? (
                                                        <ImageBackground
                                                            source={{
                                                                uri: `https://b.zmtcdn.com/images/placeholder_200.png`,
                                                            }}
                                                            style={styles.restaurantimage}>
                                                            <TouchableOpacity
                                                                delayPressIn={0}
                                                                activeOpacity={0.6}
                                                                onPress={() => null}
                                                                style={styles.faviconcontainer}>
                                                                <FavIcon
                                                                    name="favorite-border"
                                                                    style={styles.favicon}
                                                                />
                                                            </TouchableOpacity>
                                                        </ImageBackground>
                                                    ) : (
                                                        <ImageBackground
                                                            source={{
                                                                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&sensor=false&key=${key}`,
                                                            }}
                                                            style={styles.restaurantimage}>
                                                            <TouchableOpacity
                                                                delayPressIn={0}
                                                                activeOpacity={0.6}
                                                                onPress={() => null}
                                                                style={styles.faviconcontainer}>
                                                                <FavIcon
                                                                    name="favorite-border"
                                                                    style={styles.favicon}
                                                                />
                                                            </TouchableOpacity>
                                                        </ImageBackground>
                                                    )}

                                                    {/* restaurant detail container */}
                                                    <View style={styles.restaurantdetailscontainer}>
                                                        {/* first */}
                                                        <View>
                                                            <Text style={styles.title}>{item.name}</Text>
                                                            <Text style={styles.subtitle}>
                                                                {item.vicinity}
                                                            </Text>
                                                        </View>
                                                        {/* second */}
                                                        <View>
                                                            <Text style={styles.rating}>
                                                                {item.rating}{' '}
                                                                <StarIcon name="star" style={styles.staricon} />
                                                            </Text>
                                                            <Text style={styles.subtitle}>
                                                                Total Rating : {item.user_ratings_total}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

// define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchcontiner: {
        padding: 10,
    },
    rowcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: widthsize * 3 / 100,
        marginBottom: heightsize * 2 / 100,
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: widthsize * 3 / 100,
        paddingLeft: widthsize * 2 / 100,
    },
    searchicon: {
        fontSize: widthsize * 4 / 100,
        color: '#ff7575',
    },
    textinput: {
        width: '100%',
        height: heightsize * 5 / 100,
        fontSize: widthsize * 3.5 / 100,
        color: '#575656',
        letterSpacing: 1,
        padding: 0,
        paddingLeft: widthsize * 3 / 100,
    },
    divider: {
        borderTopWidth: 1.5,
        borderColor: 'gray',
        marginBottom: heightsize * 2 / 100,
        marginLeft: heightsize * 2 / 100,
        marginRight: heightsize * 2 / 100,
        opacity: 0.6
    },
    resultcontainer: {
        padding: widthsize * 2 / 100,
        paddingLeft: widthsize * 5 / 100,
    },
    resultcontainertext: {
        fontSize: widthsize * 5 / 100,
        color: '#000',
    },
    restaurantcontainer: {
        margin: widthsize * 4 / 100,
        borderWidth: 1,
        borderRadius: widthsize * 3 / 100,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
    },
    restaurantimage: {
        width: '100%',
        height: heightsize * 20 / 100,
        alignItems: 'flex-end',
    },
    faviconcontainer: {
        marginRight: widthsize * 3 / 100,
        marginTop: widthsize * 3 / 100,
        padding: 5,
        borderRadius: widthsize * 10 / 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    favicon: {
        fontSize: widthsize * 5 / 100,
        color: 'gray',
    },
    restaurantdetailscontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: widthsize * 4 / 100,
        paddingTop: widthsize * 3 / 100,
    },
    title: {
        fontSize: widthsize * 4 / 100,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: widthsize * 3 / 100,
        marginTop: heightsize * 1 / 100,
        opacity: 0.6,
    },
    rating: {
        backgroundColor: 'green',
        color: '#fff',
        padding: widthsize * 1 / 100,
        alignItems: 'center',
        fontSize: widthsize * 2.5 / 100,
        borderRadius: widthsize * 2 / 100,
        width: widthsize * 10 / 100,
        textAlign: 'center',
        alignSelf: 'flex-end',
    },
    staricon: {
        fontSize: widthsize * 2.5 / 100,
        color: '#fff',
    },
    searchrestaurantcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: widthsize * 3 / 100,
    },
    searchrestaurantimage: {
        width: widthsize * 10 / 100,
        height: widthsize * 10 / 100,
        borderRadius: widthsize * 2 / 100,
    },
    searchtitle: {
        fontSize: widthsize * 4 / 100,
        fontWeight: '700',
    },
    searchsubtitle: {
        fontSize: widthsize * 3 / 100,
        marginTop: 5,
        opacity: 0.6,
    },
});

export default ResturantList;
