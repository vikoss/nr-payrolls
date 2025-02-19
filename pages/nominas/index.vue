<template>
  <div>
    <v-select
      v-model="year"
      label="Año"
      :items="['2021', '2022', '2023', '2024', '2025']"
    ></v-select>
    <v-btn
      block
      @click="getListPayrollByYear(year)"
      :disabled="!year || loading"
    >
      Buscar
    </v-btn>
    <p class="mt-12 text-center" v-show="isCompleted && !listPayroll.length">
      <span class="mdi mdi-alert-circle-outline"></span>
      No tienes registro de nómina
    </p>
    <v-card
      v-for="(payroll, index) in listPayroll"
      :key="index"
      :title="year"
      :subtitle="payroll.fileName"
      class="my-4"
      elevation="2"
    >
      <v-card-actions>
        <v-btn
          elevation="2"
          block
          :disabled="loading"
          @click="downloadPayroll(payroll.path)"
        >
          Descargar recibo de nómina
        </v-btn>
      </v-card-actions>
    </v-card>
    <loading :show="loading" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePayrollManager } from '@/composables/usePayrollManager'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    Loading,
  },
  setup() {
    const {
      getListPayrollByYear,
      downloadPayroll,
      listPayroll,
      isCompleted,
      loading,
      error,
    } = usePayrollManager()
    const year = ref('')

    return {
      year,
      getListPayrollByYear,
      listPayroll,
      downloadPayroll,
      loading,
      error,
      isCompleted,
    }
  }

}
</script>

<style>

</style>