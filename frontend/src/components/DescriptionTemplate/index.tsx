import React from "react";
import './styles.css';

import shield from '../../public/description/ic_outline-shield.svg'
import money from '../../public/description/fluent_money-off-24-regular.svg'
import alert from '../../public/description/ri_spam-line.svg'
import logo from '../../public/description/Group 21.svg'

function DescriptionPage(){
    return(
        <div className="petAdoptContainer">
            <div className="content">
            <img className= 'logo-petadopt' src={logo} alt="logo-petadopt" />
                <p className="description">No Pet Adopt, dedicamos paixão em conectar corações peludos aos lares certos. Com uma coleção diversificada de amigos de quatro patas aguardando por um lar amoroso, proporcionamos uma experiência de adoção excepcional. Nossa missão é encontrar o parceiro peludo perfeito para você e sua família. De cães brincalhões a gatos afetuosos, cada animalzinho possui uma história única e uma personalidade cativante.</p>
                <div className="features"> 
                    <div className="feature">
                    <img className= 'img1' src={shield} alt="shield-logo" />
                        <span className="featureText">Segurança nas adoções</span>
                    </div>
                    <div className="feature">
                    <img className= 'img2' src={money} alt="money-logo" />
                        <span className="featureText">Organização sem fins lucrativos</span>
                    </div>
                    <div className="feature">
                    <img className= 'img3' src={alert} alt="alert-logo" />
                        <span className="featureText">Tempo dedicado a remover spams</span> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescriptionPage;