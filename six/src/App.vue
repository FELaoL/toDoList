<template>
	<div id="app" class="dialog">
		<header>
			<img src="./assets/icon1.svg" alt="" />
			<div class="title">To-Do List</div>
		</header>
		<div class="form">
			<h1>~ Today I need to ~</h1>
			<form>
				<input
					:value="inputValue"
					type="text"
					placeholder="Add new todo..."
					@keydown.13.prevent="saveData"
					@change="handleInputChange"
				/>
				<button class="submit" type="button" @click.prevent="saveData">Submit</button>
			</form>
		</div>
		<ul class="todos">
			<template v-for="(item, index) in infoList">
				<li :class="{ completed: item.completed }" class="todos-item" :key="index">
					<!-- 复选框 -->
					<input class="checkbox-btn" :checked="item.completed" type="checkbox" @click="e => changeCheckBox(e, item.id)" />
					<p class="content">{{ item.title }}</p>
					<!-- 删除连接 -->
					<button class="close-btn" @click="delData(item.id)">
						<svg
							class="svg-inline--fa fa-times fa-w-11 close"
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="times"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 352 512"
							data-v-132cabf7=""
						>
							<path
								class=""
								fill="currentColor"
								d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
							></path>
						</svg>
					</button>
				</li>
			</template>
		</ul>
		<!-- footer区域 -->
		<div class="menus">
			<template v-if="list.length === 0">
				<div class="empty">
					<svg
						class="svg-inline--fa fa-clipboard-check fa-w-12 icon"
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="clipboard-check"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 384 512"
						data-v-132cabf7=""
					>
						<path
							class=""
							fill="currentColor"
							d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"
						></path>
					</svg>
					<span class="msg">Congrat, you have no more tasks to do</span>
				</div>
			</template>
			<template v-else>
				<div class="out">
					<!-- 未完成个数 -->
					<span>{{ unDoneLength }} item left</span>
					<!-- 操作按钮 -->
					<div class="filters">
						<span :class="{ active: status === 0 }" class="option option0" @click="filterData(0)">All</span>
						<template v-if="completeCount > 0 && unDoneLength > 0">
							<span :class="{ active: status === 1 }" class="option option1" @click="filterData(1)">Active</span>
						</template>
						<template v-if="completeCount > 0 && unDoneLength > 0">
							<span :class="{ active: status === 2 }" class="option option2" @click="filterData(2)">Completed</span>
						</template>
					</div>
					<!-- 把已完成的任务清空 -->
					<template v-if="completeCount > 0">
						<span class="option option3" @click="clearCompleted">Clear completed</span>
					</template>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
	name: "App",
	data() {
		return {};
	},
	computed: {
		...mapState(["inputValue", "status", "list"]),
		...mapGetters(["unDoneLength", "infoList", "completeCount"])
	},
	methods: {
		// 监听文本框内容变化
		handleInputChange(e) {
			this.$store.commit("setInputValue", e.target.value);
		},
		// 向列表中新增item项
		saveData() {
			if (this.inputValue === "") return;
			this.$store.commit("addItem");
		},
		// 根据id删除对应的任务事项
		delData(id) {
			this.$store.commit("removeItem", id);
		},
		// 监听复选框选中状态变化的事件
		changeCheckBox(e, id) {
			// 通过e.target.checked 可以接收到最新的选中状态
			const params = {
				id: id,
				status: e.target.checked
			};
			this.$store.commit("changeStatus", params);
		},
		// 修改页面上展示的列表数据
		filterData(status) {
			this.$store.commit("changeViewKey", status);
		},
		// 清除已完成的任务
		clearCompleted() {
			this.$store.commit("cleanDone");
		}
	}
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html {
	line-height: 1.5;
	color: #494a4b;
}
body {
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(90deg, #ffafbd, #ffc3a0);
	display: flex;
	align-items: center;
	justify-content: center;
}
.dialog {
	padding: 30px 40px 20px;
	background: #f2f2f2;
	width: 440px;
	border-radius: 15px;
}
header {
	display: flex;
	align-items: center;
	justify-content: center;
}
header img {
	width: 80px;
	margin-right: 10px;
}
.title {
	font-size: 21px;
	background: #fe7345;
	color: #fff;
	padding: 0.25em 0.8em 0.15em;
	transform: rotate(3deg);
	border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
}
.form {
	margin-top: 25px;
	margin-bottom: 30px;
}
h1 {
	font-size: 22px;
	margin-bottom: 18px;
	text-align: center;
}
form {
	display: flex;
	justify-content: center;
}
input {
	outline: none;
	border: none;
	border-bottom: 3px dashed #fe7345;
	padding: 5px 0 3px;
	font-size: 18px;
	background: transparent;
	margin-right: 15px;
}
button {
	transform: rotate(4deg);
	border-radius: 6px;
	font-size: 16.5px;
	padding: 0.34em 0.84em;
	border: 2px solid #494a4b;
	background-color: #fff;
}
.empty {
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon {
	color: rgba(73, 74, 75, 0.35);
	width: 0.75em;
	overflow: visible;
	margin-right: 10px;
}
.empty span {
	font-size: 17px;
	padding-top: 5px;
	color: rgba(73, 74, 75, 0.35);
}
li {
	list-style: none;
}
.todos-item {
	display: flex;
	align-items: center;
	padding: 8px 10px 8px 0;
	border-radius: 5px;
}
.checkbox-btn {
	margin: 0 8px;
	outline: none;
	border: none;
	background: transparent;
}
p {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	padding-right: 7px;
}
.close-btn {
	margin: 0 -8px 0 auto;
	padding: 0 8px;
	outline: none;
	border: none;
	background: transparent;
}
svg {
	width: 0.7875em;
}
.todos-item + .todos-item {
	margin-top: 10px;
}
.completed {
	background: #fe7345;
}
.completed svg {
	color: #fff;
}
.completed p {
	color: #fff;
	text-decoration: line-through;
}
.out {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 100px;
	font-size: 12px;
}
.filter {
	display: flex;
	align-items: center;
}
.option {
	cursor: pointer;
	text-align: center;
	padding: 0 0.6em;
	border-radius: 4px;
}
.active {
	color: #fff;
	background: #fe7345;
}
</style>
