<template>
  <div class="<%= nameKebab %>">
    <h2 class="app-h2"><%= pageTitle %></h2>
    <div class="pd20">
      <div class="search-op">
        <Input v-model="inputWords" placeholder="请输入要搜索的关键字" style="width:300px">
        <span slot="prepend">关键字</span>
        <Button slot="append" type="primary" icon="search" @click="onSearchClick">搜索</Button>
        </Input>
        <Button type="success" icon="android-add" class="<%= nameKebab %>-add" @click="onClickAdd">添加用户</Button>
      </div>
      <div class="<%= nameKebab %>-list">
        <Table ref="tableList" :columns="columns" :data="list" stripe></Table>
        <Page :total="total" :page-size="pageSize" v-if="total > pageSize" show-elevator :current="curPage" @on-change="jumpPage"></Page>
      </div>
    </div>
    <item-edit :props="editProps" v-on:reloadList="fetchList"></item-edit>
  </div>
</template>

<script>
import api from '@/api';
import formatDate from '@/libs/filters/format-date';
import ItemEdit from './components/item-edit';

export default {
  name: '<%= nameKebab %>',
  data() {
    return {
      columns: [
        {
          title: '用户id',
          key: 'userId'
        },
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '创建时间',
          key: 'timeFormat'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '性别',
          render: (h, params) => {
            return h('Icon', {
              props: {
                type: params.row.sex ? 'male' : 'female',
                size: params.row.sex ? 16 : 18,
                color: params.row.sex ? '#2d8cf0' : 'pink'
              }
            });
          }
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '操作',
          render: (h, params) => {
            if (params.index === 0) {
              console.log(params.row);
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modifyItem(params.index);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  loading: params.row.isLoading
                },
                on: {
                  click: () => {
                    this.deleteItem(params.row, params.index);
                  }
                },
                ref: `delete-${params.index}`
              }, '删除')
            ]);
          }
        }
      ],
      list: [],
      curPage: 1,
      inputWords: '',
      searchWords: '',
      total: 0,
      pageSize: 20,
      editProps: {
        show: false,
        isModify: false,
        formData: {},
      },
    };
  },
  computed: {
    tableData() {
      return this.list.map(item => {
        return Object.assign({}, item, {
          timeFormat: formatDate(item.time, 'yyyy-MM-dd hh:mm:ss')
        });
      });
    }
  },
  methods: {
    onSearchClick() {
      this.searchWords = this.inputWords;
      this.curPage = 1;
      this.fetchList();
    },
    jumpPage(page) {
      this.curPage = page;
      this.fetchList();
    },
    forceUpdateList() {
      // 这里强制将list数据重新赋值一下，防止修改其中某个元素的字段时，无法触发
      // compute属性的重新计算和表格组件的重新render
      this.list = this.list.concat([]);
    },
    fetchList() {
      const { searchWords, curPage, pageSize } = this;

      api.table.getTableList({
        limit: pageSize,
        offset: (curPage - 1) * pageSize,
        search: searchWords
      }).then((data) => {
        this.list = data && data.list || [];
        this.total = data && data.count || 0;
      }).catch((err) => {
        this.list = [];
        this.total = 0;
      });
    },
    onClickAdd() {
      this.editProps = {
        show: true,
        isModify: false,
        formData: {
          sex: 1, // 性别默认选男
          role: '吃瓜群众' // 默认角色吃瓜群众
        },
      };
    },
    modifyItem(index) {
      const editItem = this.list[index];

      this.editProps = {
        show: true,
        isModify: true,
        formData: Object.assign({}, editItem),
      };
    },
    deleteItem({ userId, userName }, index) {
      const curItem = this.list[index];

      this.$Modal.confirm({
        title: '警告',
        content: `确定删除 ${userName} 吗?`,
        okText: '确认删除',
        onOk: () => {
          curItem.isLoading = true;
          this.forceUpdateList();

          api.table.deleteItem({ userId })
            .then(() => {
              this.$Message.success('删除成功');
              this.fetchList();
            })
            .catch(() => {
              curItem.isLoading = false;
              this.forceUpdateList();
            });
        }
      });
    }
  },
  created() {
    this.fetchList();
  },
  components: {
    'item-edit': ItemEdit,
  }
}
</script>

<style lang="scss" scoped>
.<%= nameKebab %> {
  &-add {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>


