import React from "react";
import logo from '../../public/logoPetAdopt.png'
import './styles.css';

function DescriptionPage(){
    return(
        <div className="petAdoptContainer">
            <div className="content">
                <h1 className="title">PET ADOPT</h1>
                <p className="description">Bem-vindo ao Pet Adopt! Aqui, estamos apaixonados por conectar corações peludos aos lares certos. Com uma coleção diversificada de amigos de quatro patas à espera de um lar amoroso, oferecemos uma experiência de adoção excepcional. Nossa missão é encontrar o parceiro peludo perfeito para você e sua família. De cães brincalhões a gatos afetuosos, cada animalzinho tem sua própria história e personalidade única. Junte-se a nós nesta jornada de amor e alegria. Cadastre-se hoje e descubra o companheiro peludo que está esperando por você!</p>
                <div className="features"> 
                    <div className="feature">
                        <span className="featureIcon">🔒</span>
                        <span className="featureText">Segurança nas adoções</span>
                    </div>
                    <div className="feature">
                        <span className="featureIcon">📊</span>
                        <span className="featureText">Organização sem fins lucrativos</span>
                    </div>
                    <div className="feature">
                        <span className="featureIcon">⏱️</span>
                        <span className="featureText">Tempo dedicado a remover spams</span> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescriptionPage;