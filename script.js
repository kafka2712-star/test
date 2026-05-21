// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Tech Stocks Rally: Is This the Right Time to Invest?",
        category: "Technology",
        excerpt: "Major tech companies have shown impressive growth this quarter. Let's analyze whether this trend is sustainable.",
        author: "John Smith",
        date: "May 20, 2025",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        title: "Energy Sector Outlook: Renewable vs Traditional",
        category: "Energy",
        excerpt: "The energy sector is undergoing a massive transformation. Here's what investors need to know.",
        author: "Sarah Johnson",
        date: "May 19, 2025",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        title: "Banking Stocks: Navigating Interest Rate Changes",
        category: "Finance",
        excerpt: "Federal Reserve policies are shifting. How will this impact banking stocks in the coming months?",
        author: "Michael Chen",
        date: "May 18, 2025",
        image: "https://images.unsplash.com/photo-1565514020176-db70448b9f63?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        title: "Healthcare Innovation: Biotech Stocks to Watch",
        category: "Healthcare",
        excerpt: "Breakthrough treatments and FDA approvals are creating opportunities in the biotech sector.",
        author: "Emily Davis",
        date: "May 17, 2025",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        title: "Market Volatility: Strategies for Uncertain Times",
        category: "Strategy",
        excerpt: "Learn proven strategies to protect your portfolio during market fluctuations.",
        author: "Robert Wilson",
        date: "May 16, 2025",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        title: "Emerging Markets: Opportunities in 2025",
        category: "Global",
        excerpt: "Discover which emerging markets offer the best potential returns for savvy investors.",
        author: "Lisa Anderson",
        date: "May 15, 2025",
        image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?w=400&h=250&fit=crop"
    }
];

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

// Function to load blog posts into the grid
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    
    if (!blogGrid) return;
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <span class="blog-card-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-card-meta">
                    <span>${post.author}</span>
                    <span>${post.date}</span>
                </div>
                <a href="#" class="read-more" onclick="showAlert('${post.title}')">Read More →</a>
            </div>
        </article>
    `).join('');
}

// Scroll to blog section
function scrollToBlog() {
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

// Handle subscription form
function handleSubscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    event.target.reset();
}

// Show alert for read more
function showAlert(title) {
    alert(`You clicked on: "${title}". Full article coming soon!`);
}

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('StockOpinion Blog loaded successfully!');
