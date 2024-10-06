let currentPage = 1;
const postContainer = document.getElementById("post_container");
const loader = document.getElementById("loader");

// Fetch posts from the API
async function fetchPosts() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=9"
        ); // Fetch 9 posts
        
        const posts = await response.json();
        displayPosts(posts);

    } 
    catch (error) {
        console.error('Error fetching posts:', error);
    }
}


function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        `;
        postContainer.appendChild(postElement);
    });
}

// if user scrolled down
function Scroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadPosts();
    }
}

function loadPosts() {
    loader.classList.add('show');
    currentPage++;
    setTimeout(() => {
        fetchPosts(currentPage);
        loader.classList.remove('show');
    }, 1000);
}


fetchPosts(currentPage);

// Infinite scroll event listener
window.addEventListener('scroll', Scroll);
