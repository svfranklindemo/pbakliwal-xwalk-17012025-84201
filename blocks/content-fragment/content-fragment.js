// put your AEM publish address here
// this fixes having to manually change the AEM host here

const AEM_HOST = checkDomain();

function checkDomain(){
  if (window.location.hostname.includes("hlx.page") || window.location.hostname.includes("localhost")){
    return "https://publish-p121371-e1189853.adobeaemcloud.com/"
  }else{
    return window.location.origin 
  }
}

export default function decorate(block) {

  const slugDiv = block.querySelector('div:nth-child(1)'); 
  const slugID = document.createElement('div');
  slugID.id = 'slug';
  slugDiv.replaceWith(slugID);
  slugID.innerHTML = `${slugDiv.innerHTML}`;
  const slug = slugID.textContent.trim();
  
  const quoteDiv = block.querySelector('div:last-of-type');
  const adventureDiv = document.createElement('div');
  adventureDiv.id = "adventure-" + slug; 
  quoteDiv.replaceWith(adventureDiv);


fetch(AEM_HOST + '/graphql/execute.json/aem-demo-assets/adventure-by-slug;slug=' + slug)
.then(response => response.json())
.then(response => {

const adventureTitle = response.data.adventureList.items[0].title;
document.getElementById(adventureDiv.id).innerHTML = "<div class='dimesion-section'><h3>"+ adventureTitle + "</h3>";

const adventureDesc = response.data.adventureList.items[0].description.plaintext;
document.getElementById(adventureDiv.id).innerHTML += "<div class='content-container'><div class='content-div'>" + adventureDesc + "</div>";

const backgroundImage = response.data.adventureList.items[0].primaryImage._path;
document.getElementById(adventureDiv.id).innerHTML += "<div class='image-div'><img src=" + AEM_HOST + backgroundImage + "></div></div>";  

const tripItinerary= response.data.adventureList.items[0].itinerary.html;
document.getElementById(adventureDiv.id).innerHTML += "<div>" + "Itinerary: </br>" + tripItinerary + "</div></div>";

})
.catch(error => {
  console.log('Error fetching data:', error);
});

}





