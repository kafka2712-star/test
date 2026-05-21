// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Tech Stocks Surge: Is the Rally Sustainable?",
        excerpt: "Analyzing the recent tech stock performance and what investors should watch for in the coming quarters.",
        category: "Technology",
        date: "2024-01-15",
        author: "John Smith",
        icon: "💻"
    },
    {
        id: 2,
        title: "Energy Sector Transformation: Opportunities Ahead",
        excerpt: "How renewable energy companies are reshaping the market and creating new investment opportunities.",
        category: "Energy",
        date: "2024-01-14",
        author: "Sarah Johnson",
        icon: "⚡"
    },
    {
        id: 3,
        title: "Banking Stocks: Navigating Interest Rate Changes",
        excerpt: "Expert analysis on how financial institutions are adapting to the changing interest rate environment.",
        category: "Finance",
        date: "2024-01-13",
        author: "Michael Chen",
        icon: "🏦"
    },
    {
        id: 4,
        title: "Healthcare Innovation: Biotech Breakthroughs",
        excerpt: "Exploring promising biotech companies and their potential impact on the healthcare sector.",
        category: "Healthcare",
        date: "2024-01-12",
        author: "Emily Davis",
        icon: "🧬"
    },
    {
        id: 5,
        title: "Market Volatility: Strategies for Uncertain Times",
        excerpt: "Proven investment strategies to protect your portfolio during market fluctuations.",
        category: "Strategy",
        date: "2024-01-11",
        author: "Robert Wilson",
        icon: "📊"
    },
    {
        id: 6,
        title: "Global Markets: Emerging Economies Watch",
        excerpt: "Analysis of emerging market trends and their potential impact on global investment portfolios.",
        category: "Global",
        date: "2024-01-10",
        author: "Lisa Anderson",
        icon: "🌍"
    }
];

// Stock data for real-time simulation
const defaultStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM'];

// Initialize homepage
document.addEventListener('DOMContentLoaded', function() {
    // Load featured posts on homepage
    const featuredPostsContainer = document.getElementById('featured-posts');
    if (featuredPostsContainer) {
        loadFeaturedPosts();
    }

    // Load market ticker on homepage
    const marketTickerContainer = document.getElementById('market-ticker');
    if (marketTickerContainer) {
        loadMarketData();
        // Refresh every 30 seconds
        setInterval(loadMarketData, 30000);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

// Load featured posts
function loadFeaturedPosts() {
    const container = document.getElementById('featured-posts');
    if (!container) return;

    const featuredPosts = blogPosts.slice(0, 3);
    container.innerHTML = featuredPosts.map(post => createPostCard(post)).join('');
}

// Create post card HTML
function createPostCard(post) {
    return `
        <div class="post-card">
            <div class="post-image">${post.icon}</div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span>${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
                <a href="#" class="read-more">Read More →</a>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Simulate loading market data (since we can't scrape directly from browser)
async function loadMarketData() {
    const container = document.getElementById('market-ticker');
    if (!container) return;

    try {
        // Try to fetch from a free API (Alpha Vantage, Financial Modeling Prep, etc.)
        // Since these require API keys, we'll simulate realistic data
        const stocks = await fetchSimulatedStockData(defaultStocks);
        renderStockData(stocks, container);
    } catch (error) {
        console.error('Error loading market data:', error);
        container.innerHTML = '<div class="loading">Unable to load market data. Please try again later.</div>';
    }
}

// Fetch simulated stock data (in production, replace with real API)
async function fetchSimulatedStockData(symbols) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic-looking stock data
    const basePrices = {
        'AAPL': 185.50,
        'GOOGL': 141.25,
        'MSFT': 378.90,
        'AMZN': 155.30,
        'TSLA': 248.50,
        'META': 353.20,
        'NVDA': 481.60,
        'JPM': 172.40
    };

    return symbols.map(symbol => {
        const basePrice = basePrices[symbol] || 100;
        const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
        const change = basePrice * (changePercent / 100);
        const price = basePrice + change;
        
        return {
            symbol: symbol,
            price: price.toFixed(2),
            change: change.toFixed(2),
            changePercent: changePercent.toFixed(2)
        };
    });
}

// Render stock data
function renderStockData(stocks, container) {
    container.innerHTML = stocks.map(stock => {
        const isPositive = parseFloat(stock.change) >= 0;
        const sign = isPositive ? '+' : '';
        return `
            <div class="stock-card">
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-price">$${stock.price}</div>
                <div class="stock-change ${isPositive ? 'positive' : 'negative'}">
                    ${sign}${stock.change} (${sign}${stock.changePercent}%)
                </div>
            </div>
        `;
    }).join('');
}

// Scraper functionality (for scraper page)
class StockScraper {
    constructor() {
        this.scraperForm = document.getElementById('scraper-form');
        this.stockInput = document.getElementById('stock-symbol');
        this.resultsTable = document.getElementById('results-table');
        this.lastUpdateEl = document.getElementById('last-update');
        
        if (this.scraperForm) {
            this.init();
        }
    }

    init() {
        this.scraperForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.fetchStockData();
        });

        // Auto-refresh every minute
        setInterval(() => {
            if (this.stockInput && this.stockInput.value) {
                this.fetchStockData();
            }
        }, 60000);
    }

    async fetchStockData() {
        const symbol = this.stockInput.value.toUpperCase().trim();
        if (!symbol) return;

        this.showLoading();
        
        try {
            // In production, this would call a backend scraper service
            // For now, we simulate with realistic data
            const data = await this.simulateScrape(symbol);
            this.renderResults(data);
            this.updateLastRefresh();
        } catch (error) {
            this.showError(error.message);
        }
    }

    async simulateScrape(symbol) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate realistic stock data
        const basePrice = Math.random() * 500 + 50;
        const changePercent = (Math.random() - 0.5) * 5;
        const change = basePrice * (changePercent / 100);
        
        return {
            symbol: symbol,
            name: this.getCompanyName(symbol),
            price: basePrice.toFixed(2),
            change: change.toFixed(2),
            changePercent: changePercent.toFixed(2),
            volume: Math.floor(Math.random() * 50000000 + 1000000),
            marketCap: (basePrice * Math.random() * 1000000000).toFixed(2),
            pe: (Math.random() * 50 + 10).toFixed(2),
            high: (basePrice * 1.02).toFixed(2),
            low: (basePrice * 0.98).toFixed(2),
            open: (basePrice * 0.99).toFixed(2),
            previousClose: (basePrice - change).toFixed(2),
            timestamp: new Date().toISOString()
        };
    }

    getCompanyName(symbol) {
        const companies = {
            'AAPL': 'Apple Inc.',
            'GOOGL': 'Alphabet Inc.',
            'MSFT': 'Microsoft Corporation',
            'AMZN': 'Amazon.com Inc.',
            'TSLA': 'Tesla Inc.',
            'META': 'Meta Platforms Inc.',
            'NVDA': 'NVIDIA Corporation',
            'JPM': 'JPMorgan Chase & Co.',
            'V': 'Visa Inc.',
            'WMT': 'Walmart Inc.'
        };
        return companies[symbol] || `${symbol} Corporation`;
    }

    showLoading() {
        if (this.resultsTable) {
            this.resultsTable.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px;">
                        <div class="loading">Fetching real-time data...</div>
                    </td>
                </tr>
            `;
        }
    }

    showError(message) {
        if (this.resultsTable) {
            this.resultsTable.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: var(--danger-color);">
                        Error: ${message}
                    </td>
                </tr>
            `;
        }
    }

    renderResults(data) {
        if (!this.resultsTable) return;

        const isPositive = parseFloat(data.change) >= 0;
        const sign = isPositive ? '+' : '';
        const changeClass = isPositive ? 'positive' : 'negative';

        this.resultsTable.innerHTML = `
            <tr>
                <td><strong>${data.symbol}</strong></td>
                <td>${data.name}</td>
                <td><strong>$${data.price}</strong></td>
                <td class="${changeClass}">${sign}${data.change}</td>
                <td class="${changeClass}">${sign}${data.changePercent}%</td>
                <td>${this.formatNumber(data.volume)}</td>
                <td>$${this.formatMarketCap(data.marketCap)}</td>
                <td>${data.pe}</td>
            </tr>
            <tr style="background: #f9fafb;">
                <td>Open</td>
                <td>High</td>
                <td>Low</td>
                <td>Prev Close</td>
                <td colspan="4">${new Date(data.timestamp).toLocaleString()}</td>
            </tr>
            <tr style="background: #f9fafb;">
                <td>$${data.open}</td>
                <td>$${data.high}</td>
                <td>$${data.low}</td>
                <td>$${data.previousClose}</td>
                <td colspan="4"></td>
            </tr>
        `;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        }
        return num.toString();
    }

    formatMarketCap(cap) {
        const num = parseFloat(cap);
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(2) + 'T';
        }
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        }
        return num.toFixed(2);
    }

    updateLastRefresh() {
        if (this.lastUpdateEl) {
            this.lastUpdateEl.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        }
    }
}

// Initialize scraper on scraper page
if (document.getElementById('scraper-form')) {
    new StockScraper();
}

// Blog page functionality
function loadBlogPosts(category = 'all') {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    let filteredPosts = blogPosts;
    if (category !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === category);
    }

    container.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
}

// Filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadBlogPosts(this.dataset.category);
        });
    });
}

if (document.getElementById('blog-posts')) {
    loadBlogPosts();
    setupFilterButtons();
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}
