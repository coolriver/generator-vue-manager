<template>
  <Modal v-model="show" :title="isModify ? '编辑信息' : '添加'" :width="520" @on-cancel="onCancel">
    <Form ref="editItemForm" :model="formData" :rules="formValidate" :label-width="100">
      <Form-item label="用户姓名" prop="userName">
        <Input style="width:300px" v-model="formData.userName"></Input>
      </Form-item>
      <Form-item label="年龄" prop="age">
        <Input style="width:300px" v-model="formData.age"></Input>
      </Form-item>
      <Form-item label="性别" prop="sex">
        <Radio-group number style="width:300px" v-model="formData.sex">
          <Radio :label="1">男</Radio>
          <Radio :label="0">女</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="角色" prop="role">
        <Select style="width:300px" v-model="formData.role">
          <Option value="管理员">管理员</Option>
          <Option value="超级管理员">超级管理员</Option>
          <Option value="吃瓜群众">吃瓜群众</Option>
        </Select>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button @click="closeModal">取消</Button>
      <Button type="primary" :loading="isSubmitLoading" @click="submitForm">提交</Button>
    </div>
  </Modal>
</template>

<script>
import api from '@/api';

export default {
  name: 'item-edit',
  data() {
    const notEmptyRule = { required: true, message: '此项必填', trigger: 'change' };

    return {
      ...this.props,
      isSubmitLoading: false,
      formValidate: {
        userName: [notEmptyRule]
      }
    };
  },
  props: ['props'],
  watch: {
    props(newProps) {
      Object.assign(this, newProps);
    }
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    onCancel() {
      const formRef = this.$refs['editItemForm'];
      formRef.resetFields();
    },
    submitForm() {
      const formRef = this.$refs['editItemForm'];
      const { isModify } = this;

      this.isSubmitLoading = true; // 确定按钮显示加载中
      formRef.validate((valid) => { // 校验整个表单
        if (valid) { // 表单验证通过
          api.table[isModify ? 'updateItem': 'addItem'](this.formData, { showLoading: false }).then((data) => { // 发送请求
            if (data !== true) { // 请求返回内容为非成功态
              this.$Message.error('操作失败');
            } else { // 操作成功
              this.$Message.success('操作成功');
              this.closeModal();
              this.$emit('reloadList');
              formRef.resetFields();
            }

            this.isSubmitLoading = false;
          }).catch(() => { // 请求返回http错误码
            this.isSubmitLoading = false;
          });
        } else { // 表单验证不通过
          this.isSubmitLoading = false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


