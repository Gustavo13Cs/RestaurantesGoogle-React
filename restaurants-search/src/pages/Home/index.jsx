import React, {useState } from "react";
import Slider from "react-slick";
import logo from '../../assets/logo.svg'
import { Container, Search, Logo, Wrapper, CorouselTitle, Carousel } from "./styles";
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png'
import { Card, RestaurantCard, Modal,Map} from "../../components";
import { useSelector } from "react-redux";

const Home = () => {

    const [inputValue, setinputValue] = useState('');
    const [modalOpened, setModalOpened] = useState(true);
    const [query, setquery] = useState(null);
    const {restaurants} = useSelector((state) => state.restaurants); // serve para pegar um componente de outro lugar da aplicação


    const settings = {
      dots: false,
      infinite: true,
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
          {restaurants.map((restaurant) => 
          <Card 
          key={restaurant.place_id}
          photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
          title={restaurant.name}
          />)}
        </Carousel>
        </Search>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
    </Container>
    <Map query={query}/>
      </Wrapper>
    )
};


export default Home;
