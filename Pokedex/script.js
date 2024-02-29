const imagem=document.getElementById('image')
const nomedoPoke= document.querySelector('.pokemon_name')
const NumeroPoke= document.querySelector('.pokemon_number')
const formulario= document.querySelector('.form')
const input=document.querySelector('.input')
const Next=document.querySelector('.button.btn-next')
const Prev=document.querySelector('.button.btn-prev')

const FetchPokemon= async (pokemon)=>{
    const ApiResponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(ApiResponse.status === 200){
    const data= await ApiResponse.json()
    return data
    }
}
let seachPoke=0

const renderPokemon= async (pokemon)=>{
    nomedoPoke.innerHTML= 'Carregando..'

    const data= await FetchPokemon(pokemon)
    if(data){
    imagem.style.display='block'
    nomedoPoke.innerHTML= data.name
    NumeroPoke.innerHTML= data.id
    imagem.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    seachPoke = data.id
}
    else{
        imagem.style.display= 'none'
        nomedoPoke.innerHTML= 'Not Found'
        NumeroPoke.innerHTML= ''
    }
}

formulario.addEventListener('submit', (event)=>{

   event.preventDefault()  //metodo para somente clicar no enter e enviar
   renderPokemon(input.value.toLowerCase())// chamou a funcao render e passou como parametro o input
   input.value=""

})

Next.addEventListener('click', ()=>{
   seachPoke += 1
   renderPokemon(seachPoke)
})
Prev.addEventListener('click',()=>{
   if(seachPoke >1){
    seachPoke -= 1
    renderPokemon(seachPoke)}
})



