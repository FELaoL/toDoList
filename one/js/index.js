$(function () {
	// 按下回车 把完整的数据 存储到本地存储里面
	// 存储的数据格式[{"content":"111","completed":false}]
	load();
	$("input").on("keydown", function (event) {
		if (event.keyCode === 13) {
			if ($(this).val() === "") {
				return;
			} else {
				// 先读取本地存储原来的数据
				var local = getData();
				// 把local数组进行更新数据，把最新的数据追加到local数组
				local.push({
					title: $(this).val(),
					completed: false
				});
				// 把这个数组local存储到本地存储
				saveData(local);
				// 2.toDoList 本地存储数据渲染加载到页面
				load();
				$(this).val();
			}
		}
	});
	// 读取本地存储的数据
	function getData() {
		var data = localStorage.getItem("todos");
		if (data !== null) {
			// 本地存储里面的数据是字符串格式的，但是我们需要的是对象格式的
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	// 保存本地存储数据
	function saveData(data) {
		localStorage.setItem("todos", JSON.stringify(data));
	}
	// 渲染加载数据
	function load() {
		// 读取本地存储的数据
		var data = getData();
		$("ul").empty();
		$(".menus").empty();
		// 遍历之前先要清空后面的元素的内容
		var todoCount = 0; // 正在进行的个数
		var completeCound = 0; // 已经完成的个数
		// 遍历这个数据
		if (Array.isArray(data) && data.length !== 0) {
			$.each(data, function (i, n) {
				if (!n.completed) {
					$("ul").prepend(
						`<li class='todos-item'>
                            <input type='checkbox' class='checkbox-btn'>
                            <p class='content'>${n.title}</p>
                            <button class='close-btn'><svg class='svg-inline--fa fa-times fa-w-11 close' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' data-v-132cabf7=''><path class='' fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg></button>
                        </li>`
					);
					todoCount++;
				} else {
					$("ul").prepend(
						`<li class='todos-item completed'>
                            <input type='checkbox' checked='checked' class='checkbox-btn'>
                            <p class='content'>${n.title}</p>
                            <button class='close-btn'><svg class='svg-inline--fa fa-times fa-w-11 close' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' data-v-132cabf7=''><path class='' fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg></button>
                        </li>`
					);
					completeCound++;
				}
			});
			$(".menus").append(
				`<div class='out'>
                    <span>${todoCount} item left</span>
                    <div class="filters">
                        <span class="option active">All</span>
                        <span class="option">Active</span>
                        <span class="option">Completed</span>
                    </div>
                    <span class="option">Clear completed</span>
                </div>`
			);
		} else {
			$(".menus").append(
				`<div class="empty">
                    <svg class="svg-inline--fa fa-clipboard-check fa-w-12 icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-v-132cabf7=""><path class="" fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"></path></svg>
                    <span class="msg">Congrat, you have no more tasks to do</span>
                </div>`
			);
		}
	}
});
