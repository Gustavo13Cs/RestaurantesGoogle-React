import React, {useState } from "react";
import Slider from "react-slick";
import logo from '../../assets/logo.svg'
import { Container, Search, Logo, Wrapper, CorouselTitle, Carousel , ModalTitle, ModalContent } from "./styles";
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png'
import { Card, RestaurantCard, Modal,Map} from "../../components";
import { useSelector } from "react-redux";

const Home = () => {

    const [inputValue, setinputValue] = useState('');
    const [modalOpened, setModalOpened] = useState(true);
    const [query, setquery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const {restaurants, resturantSelected} = useSelector((state) => state.restaurants); // serve para pegar um componente de outro lugar da aplicação


    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      adaptiveHeight: true,
    };

    function handleKeyPress(e) {
      if(e.key == 'Enter') {
        setquery(inputValue);
      }
    }

    function handleOpenModal(placeId) {
      setPlaceId(placeId);
      setModalOpened(true);
    }


    return (
      <Wrapper>
         <Container>
            <Search><Logo src={logo} alt="Logo do restaurante"/>
            <TextField
              label='Pesquisar Restaurantes'
              outlined
              trailingIcon={<MaterialIcon role="button" icon="search"/>}
            ><Input value={inputValue} onKeyPress={handleKeyPress}  onChange={(e) => setinputValue(e.target.value)} />
            </TextField>
            <CorouselTitle>Na Sua Área</CorouselTitle>
            <Carousel {...settings}>
              {restaurants.map((restaurant) => (
              <Card 
              key={restaurant.place_id}
              photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
              title={restaurant.name}
              />))}
            </Carousel>
            </Search>
            {restaurants.map((restaurant) => (
              <RestaurantCard onClick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant} />
            ))}
         </Container>
            <Map query={query} placeId={placeId}/>
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
              <ModalTitle>{resturantSelected?.name}</ModalTitle>
              <ModalContent>{resturantSelected?.formatted_phone_number}</ModalContent>
              <ModalContent>{resturantSelected?.formatted_address}</ModalContent>
              <ModalContent>{resturantSelected?.opening_hours?.open_now ? 
              'Aberto agora :-)' : 
              'Fechado neste momento :('}</ModalContent>
            </Modal>
       </Wrapper>
    )
};


export default Home;
