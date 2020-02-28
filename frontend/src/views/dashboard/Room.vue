<template>
  <div>
    <a-table v-if="isShow" class="nt-table" :columns="columns" :dataSource="dataSource" bordered rowKey="id" >
      <template
        v-for="col in ['first_name', 'email']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else
          >{{text}}</template
          >
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a @click="() => edit(record.key)">Edit</a>
        </span>
        </div>
      </template>
      <template slot="delete" slot-scope="text, record">
        <a-popconfirm
          v-if="users.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import _ from 'lodash'

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      width: '25%',
      scopedSlots: { customRender: 'title' },
    },
    {
      title: 'money',
      dataIndex: 'money',
      width: '40%',
      scopedSlots: { customRender: 'money' },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
    {
      title: 'delete',
      dataIndex: 'delete',
      scopedSlots: { customRender: 'delete' },
    },
  ]

  export default {
    data () {
      // this.cacheData = data.map(item => ({ ...item }))
      return {
        isShow: false,
        columns,
        dataSource: []
      }
    },
    mounted () {
      this.getUsers()
    },
    computed: {
      ...mapState('dashboard', { users: 'users' })
    },
    watch: {
      users (data) {
        this.dataSource = _.merge(this.dataSource, data)
        this.$set(this, 'isShow', true)
      }
    },
    methods: {
      ...mapActions('dashboard', ['getUsers', 'delUsers']),
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
      onDelete (id) {
        // const data = [...this.dataSource]
        // this.dataSource = data.filter(item => item.id !== id)
        this.delUsers(id)
      },
      edit (key) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.data = newData
        }
      },
      save (key) {
        const newData = [...this.data]
        const newCacheData = [...this.cacheData]
        const target = newData.filter(item => key === item.key)[0]
        const targetCache = newCacheData.filter(item => key === item.key)[0]
        if (target && targetCache) {
          delete target.editable
          this.data = newData
          Object.assign(
            targetCache,
            target
          )
          this.cacheData = newCacheData
        }
      },
      cancel (key) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
          delete target.editable
          this.data = newData
        }
      },
    },
  }
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
