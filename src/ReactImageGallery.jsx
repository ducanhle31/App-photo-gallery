import React, {useState} from 'react'

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const images = (["https://th.bing.com/th/id/OIP.NjdPORNuwOlRjrJTWTkwaAHaDG?pid=ImgDet&rs=1",
  "https://th.bing.com/th/id/R.dfe0523be33bed134bdff0c1f7df2bdb?rik=MXs5%2fPHg7XsaBA&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/R.dacd7bf9720a74bc73bc7c8a655c5fa5?rik=Wzk%2fImAuhQk7Dw&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.q_j3-2aiKgDcllanaNvIRQAAAA?pid=ImgDet&w=400&h=600&rs=1",
  "https://th.bing.com/th/id/OIP.o9Jhumq3FnEp7G5SdszMPAHaEK?pid=ImgDet&rs=1",
  "https://picsum.photos/1000/2500",
  "https://th.bing.com/th?id=OIF.9YK9vxIzDmjbYEOxFSK%2btg&pid=ImgDet&rs=1",
  "https://www.etappi.com/wp-content/uploads/sites/2/2019/11/shutterstock_420394765-1024x1024.jpg",
  "https://th.bing.com/th/id/R.c13480e06f711a655c800bbab14f198c?rik=Pq%2bXzE2CTNLQ1A&pid=ImgRaw&r=0",
]);
export default function ReactImageGallery() {
    const [data,setData]=useState({img:'',i:0})
    const viewImage=(img,i)=>{
setData({img,i})
    }
    const imgAction =(action)=>{
        let i=data.i;
        if(action==='next-img'){
            setData({img:images[i+1],i:i+1});
    }if(action ==="previous-img"){
            setData({img:images[i-1],i:i-1});
    }if(!action){
            setData({img:'',i:0});
    }

}

   return (<>
  
{data.img && 
<div style={{
    width:"100%",
    height:"100vh",
    background:"black",
    position:"fixed",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden",
}}>
<button onClick={()=>imgAction()} style={{position:"absolute",top:"10px",right:"10px"}}><i className="bi bi-x"></i></button>
<button onClick={()=>imgAction("previous-img")}><i className="bi bi-arrow-left-circle"></i></button>
<img src={data.img} style={{width:"auto", maxWidth:"90%",maxHeight:"90%"}} />
<button onClick={()=>imgAction("next-img")}><i className="bi bi-arrow-right-circle"></i></button>
</div>}



<div style={{padding:"10px"}}>
    <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry gutter='20px'>
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{width: "100%", display: "block",cursor:"pointer"}}
                            alt=""
                            onClick={()=>viewImage(image,i)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
    </div>
   </>
    
    
        )
}
