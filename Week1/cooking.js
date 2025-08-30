function cookingDetail(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("Cooking processed success");
        },2000);
    });
}


async function cooking(){
    console.log("Cooking Started...");
    try{
        const data = await cookingDetail();
        console.log(data);
        console.log("Cooking completed");
    }
    catch(error){
        console.log("Cooking failed",error);
    }
}

cooking();
console.log("2nd ah print agum");