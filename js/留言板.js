// 页面加载时显示已有留言
document.addEventListener('DOMContentLoaded', function() {
    displayMessages();
});

// 提交留言
function submitMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    
    if (!name || !content) {
        alert('请填写所有必填项！');
        return;
    }

    // 创建新留言对象
    const message = {
        id: Date.now(),
        name: name,
        content: content,
        date: new Date().toLocaleString()
    };

    // 获取现有留言
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    // 添加新留言
    messages.unshift(message);
    
    // 保存到 localStorage
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // 刷新显示
    displayMessages();
    
    // 重置表单
    document.getElementById('messageForm').reset();
}

// 显示留言
function displayMessages() {
    const messageList = document.getElementById('messageList');
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    messageList.innerHTML = messages.map(msg => `
        <div class="message" data-id="${msg.id}">
            <div class="message-header">
                <span class="username">姓名：${msg.name}</span>
                <span class="date">${msg.date}</span>
                <button class="delete-btn" onclick="deleteMessage(${msg.id})">删除</button>
            </div>
            <p class="content">${msg.content}</p>
        </div>
    `).join('');
}

// 删除留言
function deleteMessage(id) {
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages = messages.filter(msg => msg.id !== id);
    localStorage.setItem('messages', JSON.stringify(messages));
    displayMessages();
}

// 涂鸦板功能
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawingBoard');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const clearBtn = document.getElementById('clearCanvas');
    const saveBtn = document.getElementById('saveCanvas');

    // 设置画布大小
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40; // 减去padding
        canvas.height = 400;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 绘画状态
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // 开始绘画
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // 绘画
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // 停止绘画
    function stopDrawing() {
        isDrawing = false;
    }

    // 清空画布
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 保存涂鸦
    function saveDrawing() {
        const link = document.createElement('a');
        link.download = '我的涂鸦.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    // 添加事件监听
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    clearBtn.addEventListener('click', clearCanvas);
    saveBtn.addEventListener('click', saveDrawing);

    // 触摸设备支持
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
});