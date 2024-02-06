<template>
  <v-form @submit.prevent>
    <p>{{ files }}</p>
    <div v-for="(document, index) in documents" :key="index">
      <p>{{ document }}</p>
      <v-file-input
        :label="document.name"
        :multiple="document.multiple"
        :rules="document.required ? [rules.required] : []"
        @change="someT($event, document.id)"
      />
    </div>
    <!-- <v-file-input
      label="Acta constitutiva y su última modificación"
      v-model="form.constitutiveAct"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Cédula de Identificación Fiscal e Inscripción en el Registro Federal de Contribuyentes"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Poder suficiente del representante legal"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Identificación oficial del representante legal"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Declaración fiscal anual del ejercicio inmediato anterior"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Estados financieros del mes inmediato anterior a la fecha de solicitud de inscripción"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Dos fotografías recientes tamaño infantil a color, del propietario o representante lega"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Carta compromiso ante el municipio de Nicolás Romero, Estado de México"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Pago del impuesto sobre la renta del mes inmediato anterior a la fecha de solicitud de inscripción"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Comprobante de domicilio (luz, agua o predial)"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Escrito de Datos Bancarios en donde conste Nombre del Banco, No. de Cuenta, Sucursal y Clabe Interbancaria"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Manifestación por escrito donde bajo protesta de decir verdad se señalará que no se encuentra dentro de los supuestos mencionados por el artículo 74 de la Ley de Contratación Pública del Estado de México y Municipios"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Manifestación por escrito bajo protesta de decir verdad, donde declare que no actualiza el supuesto de conflicto de interés previsto en la Ley de Responsabilidades Administrativas del Estado de México y Municipios"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Documentación que se estime pertinente"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Opinión de cumplimiento de obligaciones ante el SAT (POSITIVO), no mayor a quince días naturales"
      v-model="form.rfc"
      :rules="[rules.required]"
    />
    <v-file-input
      label="Acta constitutiva y su última modificación"
      v-model="form.rfc"
      :rules="[rules.required]"
    /> -->
    <v-btn type="submit" block class="mt-2" @click="() => (console.log('hola'))">Entrar</v-btn>
  </v-form>
</template>

<script>
import { multipleFileRequired } from '@/utils/formValidations'
import { useDocuments } from '@/composables/useDocuments'

export default {
  setup() {
    const { loading, error, documents, getDocuments } = useDocuments()
    getDocuments()
    const form = reactive([])
    const files = ref([])
    /* const documents = [
      {
        required: true,
        multiple: true,
        name: 'Acta constitutiva y su última modificación',
        description: 'Acta constitutiva y su última modificación, tratándose de personas jurídicas colectivas; o acta de nacimiento, tratándose de personas físicas.',
      },
      {
        required: true,
        multiple: true,
        name: 'Cédula de Identificación Fiscal e Inscripción en el Registro Federal de Contribuyentes',
        description: 'Cédula de Identificación Fiscal e Inscripción en el Registro Federal de Contribuyentes, que señale el domicilio fiscal vigente, así como actividad preponderante al momento de la solicitud de registro. (Actualmente Constancia de Situación Fiscal) No mayor a 10 días naturales.',
      },
      {
        required: false,
        multiple: true,
        name: 'Poder suficiente del representante legal, emitido por Fedatario Público',
        description: 'Poder suficiente del representante legal, emitido por Fedatario Público.',
      },
      {
        required: true,
        multiple: true,
        name: 'Identificación oficial del propietario o del representante legal. (Vigente)',
        description: 'Identificación oficial del propietario o del representante legal. (Vigente)',
      },
      {
        required: true,
        multiple: true,
        name: 'Declaración fiscal anual del ejercicio inmediato anterior',
        description: 'Declaración fiscal anual del ejercicio inmediato anterior o estados financieros del último ejercicio fiscal, dictaminados por contador público registrado en términos del Código Fiscal de la Federación; o los estados de cuenta bancarios, en los que se indiquen los movimientos realizados y el saldo al final del mes anterior a la fecha de solicitud de inscripción, para el caso de empresas de nueva constitución.',
      },
      {
        required: true,
        multiple: true,
        name: 'Estados financieros del mes inmediato anterior a la fecha de solicitud de inscripción',
        description: 'Estados financieros del mes inmediato anterior a la fecha de solicitud de inscripción, acompañados de la Cédula Profesional del Contador Público que los emite.',
      },
      {
        required: true,
        multiple: true,
        name: 'Dos fotografías recientes tamaño infantil a color, del propietario o representante legal',
        description: 'Dos fotografías recientes tamaño infantil a color, del propietario o representante legal.',
      },
      {
        required: true,
        multiple: true,
        name: 'Carta compromiso ante el municipio de Nicolás Romero, Estado de México',
        description: 'Carta compromiso ante el municipio de Nicolás Romero, Estado de México para actualizar la documentación o información presentada, así como para permitir la verificación de datos, documentos e instalaciones.',
      },
      {
        required: true,
        multiple: true,
        name: 'Currículum de la Empresa o Persona física',
        description: 'Currículum de la Empresa o Persona física',
      },
      {
        required: true,
        multiple: true,
        name: 'Pago del impuesto sobre la renta del mes inmediato anterior a la fecha de solicitud de inscripción',
        description: 'Pago del impuesto sobre la renta del mes inmediato anterior a la fecha de solicitud de inscripción, con acuse de recibo del SAT, a través de Internet o recibo de pago ante institución bancaria.',
      },
      {
        required: true,
        multiple: true,
        name: 'Comprobante de domicilio (luz, agua o predial)',
        description: 'Comprobante de domicilio (luz, agua o predial).',
      },
      {
        required: true,
        multiple: true,
        name: 'Escrito de Datos Bancarios en donde conste Nombre del Banco, No. de Cuenta, Sucursal y Clabe Interbancaria.',
        description: 'Escrito de Datos Bancarios en donde conste Nombre del Banco, No. de Cuenta, Sucursal y Clabe Interbancaria.',
      },
      {
        required: true,
        multiple: true,
        name: 'Manifestación por escrito donde bajo protesta de decir verdad se señalará que no se encuentra dentro de los supuestos mencionados por el artículo 74 de la Ley de Contratación Pública del Estado de México y Municipios.',
        description: 'Manifestación por escrito donde bajo protesta de decir verdad se señalará que no se encuentra dentro de los supuestos mencionados por el artículo 74 de la Ley de Contratación Pública del Estado de México y Municipios.',
      },
      {
        required: true,
        multiple: true,
        name: 'Manifestación por escrito bajo protesta de decir verdad, donde declare que no actualiza el supuesto de conflicto de interés previsto en la Ley de Responsabilidades Administrativas del Estado de México y Municipios.',
        description: 'Manifestación por escrito bajo protesta de decir verdad, donde declare que no actualiza el supuesto de conflicto de interés previsto en la Ley de Responsabilidades Administrativas del Estado de México y Municipios.',
      },
      {
        required: false,
        multiple: true,
        name: 'Documentación que se estime pertinente',
        description: 'Documentación que se estime pertinente.',
      },
      {
        required: true,
        multiple: true,
        name: 'Opinión de cumplimiento de obligaciones ante el SAT (POSITIVO), no mayor a quince días naturales',
        description: 'Opinión de cumplimiento de obligaciones ante el SAT (POSITIVO), no mayor a quince días naturales.',
      },
    ] */
    const someT = (e, documentId) => {
      // e.target.files
      console.log(e)
      console.log(documentId)

      files.value = {
        ...files.value,
        [documentId]: {
          files: e.target.files,
        },
      }
    }

    //form = documents.map((document, index) => ({ index: { files: [] } }))

    return {
      files,
      documents,
      someT,
      form,
      rules: {
        required: multipleFileRequired,
      },
      
    }
  }

}
</script>

<style>

</style>