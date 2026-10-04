let currentItems = 12; // 初始显示的商品数量
const itemsPerLoad = 12; // 每次点击加载的数量
const initialItems = 12; // 保持初始显示数量的常量

// 加载更多商品
function loadMore() {
    const activeCategory = document.querySelector('.tab-button.active').dataset.category;
    
    if (activeCategory === 'all') {
        const items = document.querySelectorAll('.item-card.hidden');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const collapseBtn = document.getElementById('collapseBtn');
        let count = 0;
        
        items.forEach(item => {
            if (count < itemsPerLoad && item.classList.contains('hidden')) {
                item.classList.remove('hidden');
                item.classList.add('fade-in');
                count++;
            }
        });
        
        currentItems += count;
        collapseBtn.classList.remove('hidden');
        
        const remainingItems = document.querySelectorAll('.item-card.hidden');
        if (remainingItems.length === 0) {
            loadMoreBtn.parentElement.classList.add('hidden');
        }
    }
}

// 收起商品
function collapseItems() {
    const activeCategory = document.querySelector('.tab-button.active').dataset.category;
    
    if (activeCategory === 'all') {
        const allItems = document.querySelectorAll('.item-card');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const collapseBtn = document.getElementById('collapseBtn');
        
        allItems.forEach((item, index) => {
            if (index >= initialItems) {
                item.classList.add('fade-out');
            }
        });
        
        setTimeout(() => {
            allItems.forEach((item, index) => {
                if (index >= initialItems) {
                    item.classList.add('hidden');
                    item.classList.remove('fade-out');
                    item.classList.remove('fade-in');
                }
            });
            
            currentItems = initialItems;
            loadMoreBtn.parentElement.classList.remove('hidden');
            collapseBtn.classList.add('hidden');
        }, 500);
    }
}

// 重置所有商品的显示状态
function resetAllItems() {
    const allItems = document.querySelectorAll('.item-card');
    currentItems = initialItems;
    
    allItems.forEach((item, index) => {
        item.classList.remove('fade-in', 'fade-out');
        if (index < initialItems) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// 过滤商品分类
function filterItems(category) {
    const items = document.querySelectorAll('.item-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const collapseBtn = document.getElementById('collapseBtn');
    
    if (category === 'all') {
        // 切换到全部商品时，重置所有商品的显示状态
        resetAllItems();
        loadMoreBtn.parentElement.classList.remove('hidden');
        collapseBtn.classList.add('hidden');
    } else {
        // 其他分类显示逻辑
        items.forEach(item => {
            if (item.dataset.category === category) {
                item.classList.remove('hidden');
                item.classList.add('fade-in');
            } else {
                item.classList.add('hidden');
                item.classList.remove('fade-in');
            }
        });
        
        // 隐藏按钮
        loadMoreBtn.parentElement.classList.add('hidden');
        collapseBtn.classList.add('hidden');
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    
    // 为选项卡添加点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterItems(tab.dataset.category);
        });
    });
    
    // 初始化显示
    resetAllItems();
    
    // 如果商品总数小于等于初始显示数量，隐藏"加载更多"按钮
    const allItems = document.querySelectorAll('.item-card');
    if (allItems.length <= initialItems) {
        document.getElementById('loadMoreBtn').parentElement.classList.add('hidden');
    }
    
    // 隐藏收起按钮
    document.getElementById('collapseBtn').classList.add('hidden');
    
    // 默认选中"全部商品"
    document.querySelector('[data-category="all"]').classList.add('active');
});

// 添加分类功能
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const items = document.querySelectorAll('.item-card');

    function filterItems(category) {
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = '';
                setTimeout(() => item.classList.remove('fade'), 10);
            } else {
                item.classList.add('fade');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 更新选项卡状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 过滤商品
            const category = tab.dataset.category;
            filterItems(category);
        });
    });
});