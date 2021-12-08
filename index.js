//d0e72f6943ef4dfcb04fd071d1e3dc76

let source = "techcrunch";
let apiKey = "d0e72f6943ef4dfcb04fd071d1e3dc76";
let accordionNews = document.getElementById("accordionNews");

const xhr = new XMLHttpRequest();
xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
    true
);
xhr.getResponseHeader("Content-type", "application/json");

xhr.onload = function() {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        //console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                        <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse${index}"
                            aria-expanded="true"
                            aria-controls="collapse${index}"
                        >
                        <strong>Breaking News ${index+1}: </strong> ${element["title"]}
                        </button>
                        </h2>
                        <div
                        id="collapse${index}"
                        class="accordion-collapse collapse"
                        aria-labelledby="heading${index}"
                        data-bs-parent="#accordionNews"
                        >
                        <div class="accordion-body"> ${element["content"]}.<a href="${element['url']}" target="_blank">Read more here</a></div>
                        </div>
                 </div>`;
            newsHtml += news;
        });
        accordionNews.innerHTML = newsHtml;
    } else {
        console.log("Some error occured");
    }
};

xhr.send();