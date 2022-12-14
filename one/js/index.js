$(function () {
	// 按下回车 把完整的数据 存储到本地存储里面
	// 存储的数据格式[{"content":"111","completed":false}]
	load(0);
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
				load(0);
				$(this).val();
			}
		}
	});
	$(".submit").click(function () {
		if ($(this).siblings("input").val() === "") {
			return;
		} else {
			// 先读取本地存储原来的数据
			var local = getData();
			// 把local数组进行更新数据，把最新的数据追加到local数组
			local.push({
				title: $(this).siblings("input").val(),
				completed: false
			});
			// 把这个数组local存储到本地存储
			saveData(local);
			// 2.toDoList 本地存储数据渲染加载到页面
			load(0);
			$(this).siblings("input").val("");
		}
	});
	// 3.todolist 删除操作
	$("ul").on("click", ".close-btn", function () {
		// 先获取本地存储
		var data = getData();
		// 修改数据
		var index = $(this).attr("id");
		data.splice(index, 1);
		// 保存到本地存储
		saveData(data);
		// 重新渲染页面
		var completeData = data.filter((item) => item.completed);
		if (completeData.length !== data.length && window.status - 0 === 2 && completeData.length !== 0) {
			load(2);
		} else if (window.status - 0 === 1) {
			load(1);
		} else {
			load(0);
		}
	});
	// 4.todolist 正在进行和已完成选项的操作
	$("ul").on("click", "input", function () {
		// 先获取本地存储
		var data = getData();
		// 修改数据
		var index = $(this).siblings(".close-btn").attr("id");
		data[index].completed = $(this).prop("checked");
		// 保存到本地存储
		saveData(data);
		// 重新渲染页面
		var completeData = data.filter((item) => item.completed);
		if (completeData.length !== data.length && window.status - 0 === 2 && completeData.length !== 0) {
			load(2);
		} else if (window.status - 0 === 1) {
			load(1);
		} else {
			load(0);
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
	/**
	 *
	 * @param {index} status 0是全部 1是未完成 2是已完成
	 */
	function load(status) {
		window.status = status;
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
					if (status === 0 || status === 1) {
						$("ul").prepend(
							`<li class='todos-item'>
                                <input type='checkbox' class='checkbox-btn'>
                                <p class='content'>${n.title}</p>
                                <button class='close-btn' id='${i}'><svg class='svg-inline--fa fa-times fa-w-11 close' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' data-v-132cabf7=''><path class='' fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg></button>
                            </li>`
						);
					}
					todoCount++;
				} else {
					if (status === 0 || status === 2) {
						$("ul").prepend(
							`<li class='todos-item completed'>
                                <input type='checkbox' checked='checked' class='checkbox-btn'>
                                <p class='content'>${n.title}</p>
                                <button class='close-btn' id='${i}'><svg class='svg-inline--fa fa-times fa-w-11 close' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512' data-v-132cabf7=''><path class='' fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg></button>
                            </li>`
						);
					}
					completeCound++;
				}
			});
			$(".menus").append(
				`<div class='out'>
                    <span>${todoCount} item left</span>
                    <div class="filters">
                        <span class="option option0 ${status === 0 ? "active" : ""}">All</span>` +
					(completeCound > 0 && todoCount > 0 ? `<span class="option option1 ${status === 1 ? "active" : ""}">Active</span>` + `<span class="option option2 ${status === 2 ? "active" : ""}">Completed</span>` : "") +
					`</div>
                    ${completeCound > 0 ? '<span class="option option3">Clear completed</span>' : ""}
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

		// 6.查看全部的
		$(".option0").click((e) => {
			load(0);
			e.stopPropagation();
		});
		// 6.查看未完成的
		$(".option1").click((e) => {
			load(1);
			e.stopPropagation();
		});
		// 7.查看已完成的
		$(".option2").click((e) => {
			load(2);
			e.stopPropagation();
		});
		$(".option3").click((e) => {
			var data = getData();
			var tempData = [];
			if (Array.isArray(data) && data.length !== 0) {
				$.each(data, function (i, n) {
					if (!n.completed) {
						tempData.push(n);
					}
				});
			}
			saveData(tempData);
			load(0);
		});
	}
});
