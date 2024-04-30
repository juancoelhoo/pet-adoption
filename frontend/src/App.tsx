import './styles.css'
import IMAGE from './teste.jpg'

export const App = () => {
    return <>
    <h1>Pet Adpotion - {process.env.NODE_ENV} {process.env.name}</h1>
    <img src={IMAGE} alt="teste" width="300" height="400" />
    </>
}