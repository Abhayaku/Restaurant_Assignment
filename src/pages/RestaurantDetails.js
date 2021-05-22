//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import LocationIcon from 'react-native-vector-icons/SimpleLineIcons';
import { heightsize, widthsize } from '../constant/Dimension';

const key = 'AIzaSyDkGIvqAXuuOE5TUoDedazelbPdKtQxb1E';

// create component
class RestaurantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item
        }
    }

    render() {
        const { item } = this.state;
        return (
            <View style={styles.container}>

                {/* header icon container */}
                <View style={styles.headericoncontainer}>

                    <TouchableOpacity delayPressIn={0} activeOpacity={0.6} onPress={() => this.props.navigation.goBack()} style={styles.iconcontainer}>
                        <BackIcon name='arrow-back' style={styles.icon} />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />

                    <TouchableOpacity delayPressIn={0} activeOpacity={0.6} onPress={() => null} style={styles.iconcontainer}>
                        <FavIcon name="favorite-border" style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity delayPressIn={0} activeOpacity={0.6} onPress={() => null} style={styles.iconcontainer}>
                        <ShareIcon name='share' style={styles.icon} />
                    </TouchableOpacity>

                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior='automatic'>

                    {/* restaurant details */}
                    <View style={styles.row}>
                        {/* first */}
                        <View style={{ width: '70%', alignSelf: 'flex-start' }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.subtitle}>
                                {item.vicinity}
                            </Text>
                        </View>
                        {/* second */}
                        <View>
                            {/* 1st */}
                            <View style={styles.ratingview}>
                                <Text style={styles.ratingtext}>
                                    {item.rating}{'   '}
                                    <StarIcon name="star" style={styles.staricon} />
                                </Text>
                            </View>
                            {/* 2nd */}
                            {item.photos == undefined ? (
                                <View style={styles.imagecontainer}>
                                    <ImageBackground
                                        source={{
                                            uri: `https://b.zmtcdn.com/images/placeholder_200.png`,
                                        }}
                                        style={styles.imageview}>
                                        <Text style={styles.ratingtext}>
                                            {Math.floor((Math.random() * 500) + 1)}{'  '} photos
                                </Text>
                                    </ImageBackground>
                                </View>
                            ) : (
                                <View style={styles.imagecontainer}>
                                    <ImageBackground
                                        source={{
                                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&sensor=false&key=${key}`,
                                        }}
                                        style={styles.imageview}>
                                        <Text style={[styles.ratingtext, { color: '#fff', fontWeight: 'bold' }]}>
                                            {Math.floor(Math.random() * (500 - 50) + 50)}{'  '} photos
                                </Text>
                                    </ImageBackground>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* divider */}
                    <View style={styles.divider} />

                    {/* restaurant details */}
                    <View style={styles.belowrow}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <LocationIcon name="location-pin" style={styles.locationicon} />
                                <Text style={styles.locationtext}>Location</Text>
                            </View>
                            <Text style={styles.belowsubtitle}>
                                {item.vicinity}
                            </Text>
                        </View>
                        {/* second */}
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.locationtext}>Direction</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* restaurant details */}
                    <View style={styles.belowrow}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TimeIcon name="alarm" style={styles.locationicon} />
                                <Text style={styles.locationtext}>Timing</Text>
                            </View>
                            <Text style={styles.belowsubtitle}>
                                {Math.floor(Math.random() * (11 - 7) + 7)}am - {Math.floor(Math.random() * (11 - 5) + 5)}pm
                        </Text>
                        </View>
                        {/* second */}
                        <View>
                            <TouchableOpacity>
                                <PhoneIcon name="phone" style={styles.phoneicon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* restaurant details */}
                    <View style={styles.belowrow}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <CurrencyIcon name="currency-usd" style={styles.locationicon} />
                                <Text style={styles.locationtext}>Cost</Text>
                            </View>
                            <Text style={styles.belowsubtitle}>
                                {Math.floor(Math.random() * (300 - 100) + 100)} for one order (approx)
                        </Text>
                        </View>
                    </View>


                    {/* divider */}
                    <View style={styles.divider} />

                    {/* restaurant details */}
                    <View style={styles.belowrow}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.locationtext, { color: '#bf2a2a', marginLeft: 0 }]}>Details</Text>
                            </View>
                            <Text style={styles.belowsubtitle}>
                                Bussiness Status : {item.business_status}
                            </Text>
                            <Text style={styles.belowsubtitle}>
                                Openning Status : {item.opening_hours.open_now == 'true' ? 'Open' : 'Close'}
                            </Text>
                        </View>
                    </View>

                    {/* restaurant details */}
                    <View style={[styles.belowrow, { paddingTop: heightsize * 3 / 100 }]}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <Text style={[styles.locationtext, { color: '#bf2a2a', marginLeft: 0 }]}>Type of Restaurant</Text>
                            {item.types.map((data, index) => {
                                return (
                                    <View
                                        key={index}>
                                        <Text style={[styles.belowsubtitle, { marginTop: 5 }]}>
                                            {data}
                                        </Text>
                                    </View>
                                )
                            })
                            }
                        </View>
                    </View>

                    {/* restaurant details */}
                    <View style={styles.belowrow}>
                        {/* first */}
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.locationtext, { color: '#bf2a2a', marginLeft: 0 }]}>Other Info</Text>
                            </View>
                            <Text style={styles.belowsubtitle}>
                                Deliver Only
                            </Text>
                            <Text style={styles.belowsubtitle}>
                                {Math.floor(Math.random() * (99 - 5) + 5)}% people like this restaurant
                            </Text>
                        </View>
                    </View>

                </ScrollView>
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
    headericoncontainer: {
        flexDirection: 'row',
        padding: widthsize * 3 / 100,
        paddingTop: widthsize * 4 / 100,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconcontainer: {
        padding: widthsize * 3 / 100
    },
    icon: {
        fontSize: widthsize * 6 / 100,
    },
    row: {
        padding: widthsize * 3 / 100,
        paddingLeft: widthsize * 4 / 100,
        paddingRight: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: widthsize * 7 / 100,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: widthsize * 4 / 100,
        opacity: 0.6,
        marginTop: heightsize * 1 / 100
    },
    ratingview: {
        backgroundColor: '#8f8f8f',
        height: heightsize * 7 / 100,
        width: widthsize * 25 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: widthsize * 2 / 100,
        borderBottomLeftRadius: widthsize * 2 / 100
    },
    ratingtext: {
        color: '#fff',
        fontSize: widthsize * 3.5 / 100,
    },
    staricon: {
        fontSize: widthsize * 4 / 100
    },
    imagecontainer: {
        height: heightsize * 7 / 100,
        width: widthsize * 25 / 100,
        borderTopLeftRadius: widthsize * 2 / 100,
        borderBottomLeftRadius: widthsize * 2 / 100,
        marginTop: heightsize * 2 / 100,
        overflow: 'hidden'
    },
    imageview: {
        height: heightsize * 7 / 100,
        width: widthsize * 25 / 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        borderTopWidth: 1.5,
        borderColor: '#c7c7c7',
        margin: widthsize * 2 / 100,
    },
    belowrow: {
        padding: widthsize * 6 / 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    belowsubtitle: {
        fontSize: widthsize * 3.5 / 100,
        opacity: 0.6,
        marginTop: 7
    },
    locationicon: {
        fontSize: widthsize * 4 / 100,
        color: '#bf2a2a'
    },
    locationtext: {
        fontSize: widthsize * 4.5 / 100,
        color: '#bf2a2a',
        marginLeft: widthsize * 2 / 100,
    },
    phoneicon: {
        fontSize: widthsize * 6 / 100,
        color: '#bf2a2a',
        marginRight: widthsize * 5 / 100
    },
});

export default RestaurantDetails;
