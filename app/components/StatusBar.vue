<template>
  <div class="flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div 
      v-for="status in statuses" 
      :key="status.value"
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700',
        { 'bg-gray-100 dark:bg-gray-700 shadow-sm': currentStatus === status.value }
      ]"
      @click="$emit('update:modelValue', status.value)"
    >
      <div 
        class="w-3 h-3 rounded-full"
        :style="{ backgroundColor: status.color }"
      ></div>
      <span 
        :class="[
          'text-sm font-medium',
          currentStatus === status.value 
            ? 'text-gray-900 dark:text-white font-semibold' 
            : 'text-gray-700 dark:text-gray-300'
        ]"
      >
        {{ status.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Status {
  value: string
  label: string
  color: string
}

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const currentStatus = computed(() => props.modelValue)

const statuses: Status[] = [
  { value: 'outline', label: 'Outline', color: 'var(--color-peach)' },
  { value: 'draft1', label: 'Draft 1', color: 'var(--color-yellow)' },
  { value: 'revision1', label: 'Revision 1', color: 'var(--color-blue)' },
  { value: 'draft2', label: 'Draft 2', color: 'var(--color-green)' },
  { value: 'edit', label: 'Edit', color: 'var(--color-cream)' }
]
</script> 