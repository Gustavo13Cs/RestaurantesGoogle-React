import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import { setRestaurants, setRestaurant } from "../../Redux/modules/restaurants";


export const MapContainer = (props) => {
    const dispatch = useDispatch();
    const {restaurants} = useSelector((state) => state.restaurants); // serve para pegar um componente de outro lugar da aplicação
    const [map, setMap] = useState(null);
    const { google, query, placeId } = props;
    useEffect(() => {
        if(query) {
            searchByQuery(query);
        }
    },[query]);
    // melhor deixar useEffect separado,cada um cuidando do que deve fazer
    useEffect(() => {
        if(placeId) {
            getRestaurantById(placeId);
        }
    },[placeId]);

    function getRestaurantById(placeId) {
        const service = new google.maps.places.PlacesService(map);

        dispatch(setRestaurant(null));

        const request = {
            placeId,
            fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
        };

        service.getDetails(request, (place, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                //console.log('restaurants>>>',results);
                dispatch(setRestaurant(place));
            }
        });   
    }

    function searchByQuery(query) {
        const service = new google.maps.places.PlacesService(map);

        dispatch(setRestaurant([]));
        const request = {
            location: map.center,
            radius: '200',
            type: ['restaurant'],
            query,
        };

        service.textSearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                //console.log('restaurants>>>',results);
                dispatch(setRestaurants(results));
            }
        });
    }

    function searchNearby(map, center) {

        const service = new google.maps.places.PlacesService(map);

        dispatch(setRestaurant(([])));
        const request = {
            location: center,
            radius: '20000',
            type: ['restaurant'],
        };

        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                //console.log('restaurants>>>',results);
                dispatch(setRestaurants(results));
            }
        });
    }

    function onMapReady(_, map){
        setMap(map);
        searchNearby(map,map.center);
    }
    return (
        <Map google={google} centerAroundCurrentLocation onReady={onMapReady} onRecenter={onMapReady} {...props}>
            {restaurants.map((restaurant) => (
                <Marker key={restaurant.place_id} name={restaurant.name} position={{
                    lat: restaurant.geometry.location.lat(),
                    lng: restaurant.geometry.location.lng(),
                }}/>
            ))}
            <Marker/>
        </Map>
    )
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'pt-BR',
})(MapContainer);
  