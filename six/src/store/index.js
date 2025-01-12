import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {},
	state: {
		// 所有的任务列表
		list: [],
		// 文本框的内容
		inputValue: "",
		// 下一个id
		nextId: 0,
		status: 0
	},
	getters: {
		// 统计未完成的任务条数
		unDoneLength(state) {
			return state.list.length;
		},
		// 统计已完成的数量
		completeCount(state) {
			return state.list.filter(item => {
				return item.completed;
			}).length;
		},
		infoList(state) {
			if (state.status === 0) return state.list;
			if (state.status === 1) return state.list.filter(x => !x.completed);
			if (state.status === 2) return state.list.filter(x => x.completed);
			return state.list;
		}
	},
	mutations: {
		// 为store中的inputValue赋值
		setInputValue(state, val) {
			state.inputValue = val;
		},
		// 添加列表项
		addItem(state) {
			const obj = {
				id: state.nextId,
				title: state.inputValue.trim(),
				completed: false
			};
			state.list.push(obj);
			state.nextId++;
			state.inputValue = "";
		},
		// 根据id删除敌营的任务事项
		removeItem(state, id) {
			// 根据id查找对应项的索引
			const i = state.list.findIndex(x => x.id === id);
			// 根据索引，删除对应的元素
			if (i !== -1) state.list.splice(i, 1);
		},
		// 修改列表项的选中状态
		changeStatus(state, params) {
			const i = state.list.findIndex(x => x.id === params.id);
			if (i !== -1) state.list[i].completed = params.status;
		},
		// 修改视图的关键字
		changeViewKey(state, status) {
			state.status = status;
		},
		// 清除已完成的任务
		cleanDone(state) {
			state.list = state.list.filter(x => x.completed === false);
		}
	},
	actions: {}
});
