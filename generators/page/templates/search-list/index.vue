<template>
  <div class="<%= nameKebab %>">
    <h2 class="app-h2"><%= pageTitle %></h2>
    <div class="pd20">
      <div class="search-op">
        <Input v-model="inputWords" placeholder="请输入要搜索的关键字" style="width:300px">
        <span slot="prepend">关键字</span>
        <Button slot="append" type="primary" icon="search" @click="onSearchClick">搜索</Button>
        </Input>
      </div>
      <div class="<%= nameKebab %>-list">
        <Table :columns="columns" :data="tableData" stripe></Table>
        <Page :total="total" :page-size="pageSize" v-if="total > pageSize" show-elevator :current="curPage" @on-change="jumpPage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import formatDate from '@/libs/filters/format-date';

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
        }
      ],
      list: [],
      curPage: 1,
      inputWords: '',
      searchWords: '',
      total: 0,
      pageSize: 20,
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
    }
  },
  created() {
    this.fetchList();
  }
}
</script>

<style lang="scss" scoped>

</style>


