// eslint-disable-next-line react/prop-types
function Carousel({name,description,image,slideno,totalSlides}){

return(
    <div id={`slide${slideno}`} className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img src={image}  className="w-40 rounded-full border-2 border-gray-400"/>
                <p className="text-xl text-gray-200 text-center">
                    {description }
                </p>
                <h3 className="text-2xl font-semibold">- {name}</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${(slideno== 1 ? totalSlides : (slideno- 1))}`} className="btn btn-circle">❮</a> 
                        <a href={`#slide${(slideno) % totalSlides + 1}`} className="btn btn-circle">❯</a>       
                 </div>
            </div>
    </div>
);

}

export default Carousel