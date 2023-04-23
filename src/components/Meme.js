import React from "react";

export default function Meme(){




    const [meme,setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/30b1gx.jpg"
        }
    )
    
    function handleChange(event){
        setMeme(prevmeme => {
            const {name, value} = event.target
            return({
                ...prevmeme,
                [name]: value
            })
        })
    }

    const [allMemes,setAllMemes]= React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
             .then(res => res.json())
             .then(data => setAllMemes(data.data.memes))
    },[])
    console.log(allMemes)

    function getMemeImage(){
        const memesArray =allMemes
        const i = Math.floor(Math.random()*memesArray.length)
        setMeme(prevmeme => {return(
            {
                ...prevmeme,
                randomImage: memesArray[i].url
            }
        )})
    }

    return(
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form--input" 
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    className="form--input" 
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={getMemeImage}>Get a new meme image !</button>
            </div>
            <div className="meme">
                 <img src={meme.randomImage} className="meme--image" />
                 <h2 className="meme--textTop">{meme.topText}</h2>
                 <h2 className="meme--textBottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}