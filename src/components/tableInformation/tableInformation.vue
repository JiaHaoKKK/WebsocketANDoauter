<template>
  <div class="wrapper">
    <Table border
           :loading="loading"
           :columns="columns"
           :data="userlist"
           height="300">
      <template slot-scope="{ row }"
                slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }"
                slot="action">
        <Button type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(index)">修改</Button>
        <Button type="error"
                size="small"
                @click="remove(index)">删除</Button>
      </template>
    </Table>
    <change-password ref="changepassword"
                     :currentuserId="resetUserid"></change-password>
  </div>
</template>
<style scoped>
.wrapper {
  position: absolute;
  top: 50%;
  bottom: 0;
}
</style>

<script>
/*eslint-disable*/
import { get, post, delet } from '@/api/axios.js'
// import { Toast } from 'vant'
import changePassword from 'components/changePassword/changePassword'
export default {
  props: {
    loading: true,
    userlist: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      //   loading: true,
      resetUserid: '',//当前修改的用户名
      columns: [
        {
          title: 'ID',
          slot: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$refs.changepassword.isshow(true)
      this.resetUserid = this.userlist[index].id
    },
    remove (index) {
      // 删除确认
      let that = this
      this.$Modal.confirm({
        title: "删除确认",
        content: `用户：${this.userlist[index].username}即将被删除`,
        onOk: function () {
          confirmremove(index)
        }
      })
      let confirmremove = function (index) {
        // 刷新data
        let id = that.userlist[index].id
        delet('/users/' + id + '/roles/' + that.userlist[index].roles[0].id).then((data) => {
          that.userlist.splice(index, 1)
          that.$Message.success({
            content: '删除成功',
            duration: 1
          })
        }).catch((error) => {
          that.$Message.error({
            content: '无法删除同一权限的用户',
            duration: 1
          })
        })
      }

    }
  },
  components: {
    changePassword
  }
}
</script>
