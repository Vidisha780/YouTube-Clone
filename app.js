const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAmxQmfY3UFkGtOJA-xaskpKfZL_Mx8MhU";    //Storing api key in a variable
let video_http = "https://www.googleapis.com/youtube/v3/videos?";   //add "?" at the last of the link because we need to add some parameters to this link.
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// Using fetch() to fetch data from YouTube
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,    
    regionCode: 'IN'
}))
.then(response => response.json())
.then(data => {
    // console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));    //handling the errors

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
            // console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data);
        makeVideoCard(video_data);
    })
}

// creating video card
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name"${data.snippet.channelTitle}></p>
            </div>
        </div>
    </div>
    `;
}

// search bar 
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})