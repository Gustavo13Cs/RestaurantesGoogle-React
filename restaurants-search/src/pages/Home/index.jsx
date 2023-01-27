import React, {useState } from "react";
import logo from '../../assets/logo.svg'
import { Container, Search } from "./styles";
import TextField, {Input} from '@material/react-text-field';

const Home = () => {

    const [inputValue, setinputValue] = useState('');

    return (
        <Container>
        <Search><img src={logo} alt="Logo do restaurante"/>
        <TextField
          label='Pesquisar'
          outlined
          //onTrailingIconSelect={() => this.setState({value: ''})}
          //trailingIcon={<MaterialIcon role="button" icon="delete"/>}
        ><Input
           value={inputValue}
           onChange={(e) => setinputValue(e.target.value)} />
        </TextField>
        </Search>
    </Container>
    )
};


export default Home;
