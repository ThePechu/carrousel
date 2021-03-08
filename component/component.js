
/*
*
*   Sintaxis que devuelve sliderRevolution
*
*   <div class="slider-revolution-general" id="slider-revolution">
*       <div class="slider-revolution-inner" id="slider-revolution-inner">
*           
*            <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
*
*            <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
*
*             <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
*
*       </div>
*
*       <div class="slider-revolution-control" id="slider-revolution-control">
*          
*         <div class="slider-revolution-prev" id="slider-revolution-prev"></div>
*        <div class="slider-revolution-next" id="slider-revolution-next"></div>
*   </div>
*  <div class ="slider-revolution-indicators" id="slider-revolution-indicators">
*     <li value="..."></li>
*    .
*    .
*    .
*
*       </div>
*  </div>
*
*/

/* CLASE SLIDER REVOLUTION */
/*
*
*   Clase sliderRevolution  
*
*   Necesario a la hora de llamar al método customElement
*   y asociar al nombre de la etiqueta
*
*/

class sliderRevolution extends HTMLElement
{

    constructor()
    {
        super();
        this.shadow = this.attachShadow({ mode: "open"});


        // Creamos el link hacia los estilos del componente //

        let style = document.createElement("link");
        style.href="component/style.css";
        style.rel="stylesheet";
        style.type="text/css";

        // Creamos el link hacia los estilos del componente //

        this.shadow.append(style);


        /* Creamos las subetiquetas necesarios - Mirar la sintaxis de la etiqueta <slider-revolution>*/
        
        /* Parte slider-revolution-general */
        this.div1 = document.createElement('div');
        this.div1.className="slider-revolution-general";
        this.div1.id="slider-revolution-general";
        
        /* Parte slider-revolution-general */
        
        /* Parte slider-revolution-inner */

        this.inner = document.createElement('div');
        this.inner.className="slider-revolution-inner";
        this.inner.id="slider-revolution-inner";

        /* Parte slider-revolution-inner */

        /* Parte slider-revolution-control */

        this.control = document.createElement('div');
        this.control.className="slider-revolution-control";
        this.control.id="slider-revolution-control"

        /* Parte slider-revolution-control */

        /* Parte slider-revolution-indicators */


        this.indicators = document.createElement('div');
        this.indicators.className="slider-revolution-indicators";
        this.indicators.id="slider-revolution-indicators";

        /* Parte slider-revolution-indicators */

        /* Parte slider-revolution-info */

        this.info = document.createElement('div');
        this.info.className="slider-revolution-info";
        this.info.id="slider-revolution-info";
        
        /* Parte slider-revolution-info */
 
        /* 
        *   Incorporar elementos al shadow-root 
        *   
        *   También incorporaremos los botones de avanzar o retroceder imagen  
        * 
        */

        this.div1.append(this.inner);
        this.div1.append(this.control);
        this.div1.append(this.indicators)
        this.div1.append(this.info);
        this.shadow.append(this.div1);
        let fragmentControls = document.createDocumentFragment();
        let right = document.createElement("div");
        right.className="slider-control-right";
        right.id="slider-control-right";
        let left = document.createElement("div");
        left.className="slider-control-left";
        left.id="slider-control-left";

        /* Eventos clic para botones derecha e izquierda */

      

        fragmentControls.append(left);
        fragmentControls.append(right);

        this.shadowRoot.getElementById("slider-revolution-control").append(fragmentControls);


        /* 
        *   Eventos para los botones de avanzar o retroceder 
        *
        *   -- getNextImg --
        *
        *   Parámetro 0 --> Retroceder carousel
        *   Parámetro 1 --> Avanzar carousel
        * 
        */

        this.shadowRoot.getElementById("slider-control-right").addEventListener("click", e => 
        {
            this.getNextImg(1);
        });

        this.shadowRoot.getElementById("slider-control-left").addEventListener("click", e => 
        {
            this.getNextImg(0);
        });
        

        

    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }


    /*  Static get observedAttributes() 
    *
    *   Retorno de atributos que utilizaremos dentro de la etiqueta <slider-revolution ... >
    *
    *   Width -> Establece el ancho del contenido de carousel. En % || px || rem
    *   Height -> Establece el alto del contenido del carousel. En % || px || rem  (SE RECOMIENDA PX O REM)
    *   Animation-slide -> Por ahora, recogerá los valores opacity y slide para el tipo de transición de imagen.
    *   time -> Tiempo de duración de la animación. Tiempo que se establecerá en la función setInterval en transitionImg
    * 
    * 
    */ 

    static get observedAttributes()
    {
        return ['width', 'height', 'animation-slide', 'time'];
    }


    /*
    *
    *   attributeChangedCallback(name, oldValue, newValue)
    * 
    *   Se ejecutará cuando exista un atributo con un valor o si se ha realizado un
    *   cambio
    * 
    *   Realizaremos un Switch en el caso de que haya un nuevo valor (newValue)
    * 
    * 
    */ 


    attributeChangedCallback(name, oldValue, newValue)
    {
        if(newValue)
        {                    
            /* Para asegurarnos, obtendremos el valor en String */
            
            const value = String(newValue);

            switch(name)
            {
                /* Caso width
                *
                *  Asignaremos el valor de width al elemento con id Inner. Este elemento es el contenedor de los items
                *  que contienen cada imagen.  
                *
                */ 

                case "width":
                    this.shadowRoot.getElementById("slider-revolution-inner").style.width=value;
                break;

                /* Caso height
                *
                *  Asignaremos el valor de height al elemento con id Inner. Este elemento es el contenedor de los items
                *  que contienen cada imagen.  
                *
                */ 

                case "height":
                    this.shadowRoot.getElementById("slider-revolution-inner").style.height=value;
                break;

                /* Caso time
                *
                *  Recogemos el tipo de clase que se esta utilizando (depende de animation-slide):
                *  
                *  Si es opacity (slider-revolution-item), recogeremos los items de esa clase y asignaremos 
                *  la propiedad css animation-duration.
                *  
                *  Si es slide (slider-revolution-item slide), recogeremos los items de esa clase y asignaremos 
                *  la propiedad css animation-duration.
                */ 

                case "time":

                    if(this.shadowRoot.getElementById("slider-revolution-inner").getElementsByClassName("slider-revolution-item slide"))
                    {
                        let items = this.shadowRoot.getElementById("slider-revolution-inner").getElementsByClassName("slider-revolution-item slide");
                        let seg = parseInt(newValue)/1000;
                        seg = String(seg);
    
                        for(let item of items)
                        {
                            item.style.animationDuration=seg+"s";
                        }

                    }

                    if(this.shadowRoot.getElementById("slider-revolution-inner").getElementsByClassName("slider-revolution-item"))
                    {
                        let items = this.shadowRoot.getElementById("slider-revolution-inner").getElementsByClassName("slider-revolution-item");
                        let seg = parseInt(newValue)/1000;
                        seg = String(seg);
    
                        for(let item of items)
                        {
                            item.style.animationDuration=seg+"s";
                        }
                        
                    }

                    // 
                    //  Invocaremos a la función transitionImgs, pasando el nuevo valor de time para que inicie el setInterval, función que controlará
                    //  la transición de imágenes    
                    //
                    newValue = parseInt(newValue);
                    this.transitionImgs(parseInt(newValue));
                   
                break;

                    /* 
                    *   Tipo de transición que llamaremos a la función setTypeSlider
                    */

                case "animation-slide":
                    
                    this.setTypeSlider(newValue);
                    
                break;

                
            }           
        }
    }

    adoptedCallback()
    {

    }


    render()
    {

    }

    /*
    *
    *   Función getImgOfIndicator que recoge el valor de la imagen si hemos pinchado a un circulo de diapositivas del
    *   carousel
    *
    *   Leemos la posición de la imagen para saber que imagen activar. También cerraremos la imagen que se encuentre activa,
    *   por eso es importante controlar los nombres de las clases.
    * 
    */ 

    getImgOfIndicator = function (value)
    {
        let indicators = this.shadowRoot.getElementById("slider-revolution-indicators").children;
        let items = this.shadowRoot.getElementById("slider-revolution-inner").children;
        for(let i=0; i<indicators.length; i++)
        {
            if(i==value)
            {
                indicators[i].className = "active";
                if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                {
                    items[i].className = "slider-revolution-item active";
                }
                else
                {
                    items[i].className = "slider-revolution-item slide active";
                }

                // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                this.shadowRoot.getElementById("slider-revolution-info").textContent=items[i].firstElementChild.alt;

                // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

            }
            else
            {
                if(indicators[i].className == "active")
                {
                    indicators[i].className = "close";
                    if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                    {
                        items[i].className = "slider-revolution-item close";
                    }
                    else
                    {
                        items[i].className = "slider-revolution-item slide close";
                    }
                }
            }
        }

    }


    /*
    *
    *   Función getNextImg que recoge la opción para cambiar de imagen.
    *   
    *   Valores opc:
    *   0 --> Retroceder carousel
    *   1 --> Avanzar carousel
    *   
    *   Para ello, recogeremos todos los items, dentro del inner y obtenemos si la imagen
    *   se esta mostrando (clase active) o no (clase close).
    * 
    *   Si esta mostrando la imagen --> Cerrar la imagen, añadiendo la clase close en el item
    * 
    *   Si no esta cerrada, se comprueba si se debe de abrir o no, dependiendo de la opción que
    *   haya activado el evento por parte del usuario (si es para retroceder o avanzar).
    * 
    *   Controlaremos también los tipos de clase segun el tipo de transición
    * 
    * 
    */ 


    getNextImg = function (opc) 
    {
        let items = this.shadowRoot.getElementById("slider-revolution-inner").children;

        switch(opc)
        {
            case 0:
                
                for(let i=0; i<items.length; i++)
                {
                    if(items[i].className==="slider-revolution-item active" || items[i].className==="slider-revolution-item slide active")
                    {
                        let indicators =  this.shadowRoot.getElementById("slider-revolution-indicators").children;

                        if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                        {
                            items[i].className="slider-revolution-item close";
                        }
                        else
                        {
                            items[i].className="slider-revolution-item slide close";
                        }
                        indicators[i].className="close";
                        
                        if(items[i-1])
                        {
                            if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                            {
                                items[i-1].className="slider-revolution-item active";
                            }
                            else
                            {
                                items[i-1].className="slider-revolution-item slide active";
                            }

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            this.shadowRoot.getElementById("slider-revolution-info").textContent=items[i-1].firstElementChild.alt;

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //

                            indicators[i-1].className="active";

                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //


                        }
                        else
                        {
                            if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                            {
                                items[(items.length - 1)].className="slider-revolution-item active";
                            }
                            else
                            {
                                items[(items.length - 1)].className="slider-revolution-item slide active";
                            }

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            this.shadowRoot.getElementById("slider-revolution-info").textContent=items[(items.length - 1)].firstElementChild.alt;

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //

                            indicators[(items.length - 1)].className="active";

                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //

                        }
                        
                        break;
                    }
                }
            break;

            case 1:

    
                for(let i=0; i<items.length; i++)
                {
                    
                    if(items[i].className==="slider-revolution-item active" || items[i].className==="slider-revolution-item slide active")
                    {

                        // 
                        //  Recogemos los elementos de indicadores para que cuando la imagen quede activada, se sincronize con
                        //  con el indicador activado.
                        //

                        let indicators =  this.shadowRoot.getElementById("slider-revolution-indicators").children;

                        if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                        {
                            items[i].className="slider-revolution-item close";
                        }
                        else
                        {
                            items[i].className="slider-revolution-item slide close";
                        }

                        // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //

                        indicators[i].className="close";

                        // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //

                        
                        if(items[i+1])
                        {
                            if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                            {
                                items[i+1].className="slider-revolution-item active";
                            }
                            else
                            {
                                items[i+1].className="slider-revolution-item slide active";
                            }
                            
                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            this.shadowRoot.getElementById("slider-revolution-info").textContent=items[i+1].firstElementChild.alt;

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //
                            
                            indicators[i+1].className="active";
                            
                            // Cambiaremos la clase del indicador, utilizando la misma posición que la posición del items //


                        }
                        else
                        {
                            if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                            {
                                items[0].className="slider-revolution-item active";
                            }
                            else
                            {
                                items[0].className="slider-revolution-item slide active";
                            }

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            this.shadowRoot.getElementById("slider-revolution-info").textContent=items[0].firstElementChild.alt;

                            // Recogemos el atributo alt de una imagen de un item gracias al método firstElementChild.alt //

                            indicators[0].className="active";

                        }
                        
                        break;

                    }
                }
            break;

        }
    }


    /*
    *
    *   Función setTypeSlider
    * 
    *   Recoge el tipo de transición para declarar las clases necesarias
    *   para que el tipo de transición funcione correctamente
    * 
    *   Por ahora, solo tenemos los siguientes valores:
    *   opacity -> Transición de desvanecimiento de una imagen a otra
    *   slide ---> Transición de movimiento en eje X de la imagen. Izquierda a derecha.
    * 
    *   En caso de que el valor no sea opacity ni slide, por defecto utilizará la transición de
    *   desvanecimiento
    * 
    *   En este paso, recogemos las imagenes que hayamos introducido dentro de nuestra etiqueta slider-revolution
    *   y lo incluiremos en cada elemento div llamado item que pertenecerá como elemento hijo de inner.
    * 
    *   Ejemplo: Si son 3 imagenes, el resultado es el siguiente:
    * 
    *       <div class="slider-revolution-inner" id="slider-revolution-inner">
    *           
    *            <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
    * 
    *               <img alt="" .... />
    * 
    *            </div>
    * 
    *            <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
    * 
    *               <img alt="" .... />
    * 
    *            </div>
    * 
    *            <div class="slider-revolution-inner-item" id="slider-revolution-inner-item">
    * 
    *               <img alt="" .... />
    * 
    *            </div>
    * 
    *       </div>
    * 
    */ 




    setTypeSlider(value)
    {
        const imgs = this.children;
        let fragment = document.createDocumentFragment();
        const longitudImagenes = imgs.length;
        this.shadowRoot.getElementById("slider-revolution-info").textContent=imgs[0].alt;

        while(this.children.length!=0)
        {
            imgs[0].style="width: 100%; height: 100%";
            let item = document.createElement("div");

            item.className = "slider-revolution-item";
            if(imgs.length == longitudImagenes)
            {
                switch(value)
                {
                    case "opacity":

                        item.className += " active";

                    break;

                    case "slide":
                        
                        item.className += " slide active";

                    break;

                    // En caso de que el valor no sea opacity ni slide, por defecto utilizará la transición de desvanecimiento //

                    default:

                        item.className += " active";
                }
            }
            else
            {
                switch(value)
                {
                    case "opacity":

                        item.className += " close";

                    break;

                    case "slide":

                        item.className += " slide close";

                    break;

                    // En caso de que el valor no sea opacity ni slide, por defecto utilizará la transición de desvanecimiento //

                    default:

                        item.className += " close";

                }
            }
            

            item.appendChild(imgs[0]);
            
            fragment.appendChild(item);
        }

        this.inner.appendChild(fragment);
        this.setIndicators(longitudImagenes);
       // this.transitionImgs();
        
    }

    /*
    *
    *   Método setIndicators que recoge la longitud de imágenes 
    * 
    *   Necesario para realizar la parte del indicador o circulos que representa a cada imagen 
    *   del carousel.
    * 
    *   Vamos a asignar el valor a elemento que representa la posición de la imagen, necesaria para que en 
    *   la función getImgOfIndicator podamos pasar dicho valor.
    * 
    */ 

    setIndicators(longitudImagenes)
    {
        for(let i=0; i<longitudImagenes; i++)
        {
            let indicator = document.createElement("div");

            // Valor del elemento que indica la posición de la imagen //
            
            indicator.value=i;

            // Valor del elemento que indica la posición de la imagen //

            
            if(i===0)
            {
                indicator.className="active";
            }
            else
            {
                indicator.className="close";
            }

            //
            // Asignaremos eventos para que cuando haga click en un circulo, llame a la función getImgOfIndicator donde se le pasa
            // el valor de ese elemento 
            //


            indicator.addEventListener("click", e => {
                this.getImgOfIndicator(parseInt(indicator.value));
            });
            this.shadowRoot.getElementById("slider-revolution-indicators").append(indicator);
        }
    }

    /*
    *
    *   Función transitionImgs donde recibe el valor del time (en ms)
    * 
    *   El valor time establecera el tiempo para el setInterval, donde 
    *   realizará el cambio de una imagen a otra.
    * 
    *   Por ello, recogeremos todos los items de las imágenes para recoger que elemento
    *   o imagen se encuentra mostrando (clase active) o no (clase close).
    * 
    *   Por defecto, recoge el siguiente elemento o item a excepción de un caso muy sencillo:
    * 
    *   - Cuando llegamos al último elemento, volverá al primer elemento o item.
    * 
    *   Al igual que hemos hecho con las funciones getNextImg o getImgOfIndicator, 
    *   controlaremos la posición de los indicadores o circulos que señala la posición
    *   de la imagen en el carousel.
    * 
    * 
    * 
    */ 




    transitionImgs(time)
    {
        setInterval(() => 
        {
            let objs = this.shadowRoot.getElementById("slider-revolution-inner").children;
            let indicators = this.shadowRoot.getElementById("slider-revolution-indicators").children;
            for(let i = 0; i < objs.length; i++)
            {
                if(objs[i].className == "slider-revolution-item active" || objs[i].className == "slider-revolution-item slide active")
                {
                    
                    if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                    {
                        objs[i].className = "slider-revolution-item close";
                    }
                    else
                    {
                        objs[i].className = "slider-revolution-item slide close";
                    }

                    indicators[i].className="close";

                    if(objs[i+1])
                    {
                        if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                        {
                            objs[i+1].className="slider-revolution-item active";
                        }
                        else
                        {
                            objs[i+1].className = "slider-revolution-item slide active";
                        }
                        this.shadowRoot.getElementById("slider-revolution-info").textContent=objs[i+1].firstElementChild.alt;
                        indicators[i+1].className="active";
                        break;
                    }
                    else
                    {
                        if(this.getAttribute("animation-slide") == "opacity" || this.getAttribute("animation-slide") == null)
                        {
                            objs[0].className="slider-revolution-item active";
                        }
                        else
                        {
                            objs[0].className="slider-revolution-item slide active";

                        }
                       
                        this.shadowRoot.getElementById("slider-revolution-info").textContent=objs[0].firstElementChild.alt;
                        indicators[0].className="active";
                        break;

                    }
                }
                

            }
        }, time);
    }
            
}






customElements.define('slider-revolution', sliderRevolution);
