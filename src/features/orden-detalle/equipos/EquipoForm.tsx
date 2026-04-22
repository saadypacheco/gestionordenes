import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Switch, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { equipoFormSchema, type EquipoFormInput } from './validators';

type Props = {
  /** Valor inicial del nroSerie (ej: proviene del scanner). */
  nroSerieInicial?: string;
  saving: boolean;
  errorGeneral?: string | null;
  onSubmit: (data: EquipoFormInput) => Promise<void> | void;
  onCancelar: () => void;
};

export function EquipoForm({
  nroSerieInicial = '',
  saving,
  errorGeneral,
  onSubmit,
  onCancelar,
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EquipoFormInput>({
    resolver: zodResolver(equipoFormSchema),
    defaultValues: {
      nroSerie: nroSerieInicial,
      descripcion: '',
      abonado: undefined,
    },
  });

  useEffect(() => {
    if (nroSerieInicial) {
      setValue('nroSerie', nroSerieInicial, { shouldValidate: true });
    }
  }, [nroSerieInicial, setValue]);

  return (
    <View className="p-4">
      {/* nroSerie */}
      <View className="mb-3">
        <Text className="mb-1 text-xs font-medium text-text-secondary">
          Número de serie *
        </Text>
        <Controller
          control={control}
          name="nroSerie"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="Ej: ABC123456"
              placeholderTextColor="#94A3B8"
              className="rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-text-primary"
              accessibilityLabel="Número de serie"
            />
          )}
        />
        {errors.nroSerie && (
          <Text className="mt-1 text-xs text-state-danger">{errors.nroSerie.message}</Text>
        )}
      </View>

      {/* descripcion */}
      <View className="mb-3">
        <Text className="mb-1 text-xs font-medium text-text-secondary">
          Descripción (opcional)
        </Text>
        <Controller
          control={control}
          name="descripcion"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Se autocompleta si el equipo está en el catálogo"
              placeholderTextColor="#94A3B8"
              className="rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-text-primary"
              accessibilityLabel="Descripción del equipo"
            />
          )}
        />
        {errors.descripcion && (
          <Text className="mt-1 text-xs text-state-danger">{errors.descripcion.message}</Text>
        )}
      </View>

      {/* abonado */}
      <View className="mb-4 flex-row items-center justify-between rounded-lg border border-border bg-surface-card px-3 py-2.5">
        <Text className="text-sm text-text-primary">¿Equipo del abonado?</Text>
        <Controller
          control={control}
          name="abonado"
          render={({ field: { value, onChange } }) => (
            <Switch
              value={value ?? false}
              onValueChange={onChange}
              thumbColor={value ? '#1E40AF' : '#CBD5E1'}
              trackColor={{ true: '#93C5FD', false: '#E2E8F0' }}
              accessibilityLabel="Marcar si el equipo es del abonado"
            />
          )}
        />
      </View>

      {errorGeneral && (
        <Text className="mb-3 text-center text-xs text-state-danger">{errorGeneral}</Text>
      )}

      <View className="flex-row gap-2">
        <Pressable
          onPress={onCancelar}
          disabled={saving}
          accessibilityRole="button"
          className="flex-1 items-center rounded-lg border border-border bg-surface-card py-3 active:opacity-70"
        >
          <Text className="text-sm font-medium text-text-secondary">Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center rounded-lg bg-brand-primary py-3 active:opacity-80 disabled:opacity-50"
        >
          {saving && <ActivityIndicator size="small" color="#fff" className="mr-2" />}
          <Text className="text-sm font-semibold text-white">Agregar</Text>
        </Pressable>
      </View>
    </View>
  );
}
