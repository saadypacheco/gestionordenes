import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginFormValues } from '@/features/auth/validators';
import { useLoginMutation } from '@/features/auth/useLogin';

export default function Login() {
  const router = useRouter();
  const { ejecutar, pending } = useLoginMutation();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { xalias: '', xpass: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorServidor(null);
    const res = await ejecutar(values.xalias, values.xpass);
    if (res.ok) {
      router.replace('/(tabs)');
    } else {
      setErrorServidor(res.error.mensaje);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-primary">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-10">
            <View className="mb-10 items-center">
              <Text className="text-4xl font-bold text-white">Gestión de Órdenes</Text>
              <Text className="mt-2 text-base text-white/80">Acceso instalador</Text>
            </View>

            <View className="rounded-2xl bg-surface-card p-6 shadow-lg">
              {/* Usuario */}
              <Text className="mb-1 text-sm font-medium text-text-secondary">Usuario</Text>
              <Controller
                control={control}
                name="xalias"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="alias"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    textContentType="username"
                    editable={!pending}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    className="rounded-lg border border-border bg-surface-bg px-4 py-3 text-base text-text-primary"
                  />
                )}
              />
              {errors.xalias && (
                <Text className="mt-1 text-xs text-state-danger">{errors.xalias.message}</Text>
              )}

              {/* Password */}
              <Text className="mb-1 mt-4 text-sm font-medium text-text-secondary">Contraseña</Text>
              <Controller
                control={control}
                name="xpass"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    editable={!pending}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType="go"
                    className="rounded-lg border border-border bg-surface-bg px-4 py-3 text-base text-text-primary"
                  />
                )}
              />
              {errors.xpass && (
                <Text className="mt-1 text-xs text-state-danger">{errors.xpass.message}</Text>
              )}

              {/* Error del servidor */}
              {errorServidor && (
                <View className="mt-4 rounded-lg border border-state-danger/30 bg-state-danger/10 p-3">
                  <Text className="text-sm text-state-danger">{errorServidor}</Text>
                </View>
              )}

              {/* Botón */}
              <Pressable
                accessibilityRole="button"
                onPress={handleSubmit(onSubmit)}
                disabled={pending}
                className={`mt-6 flex-row items-center justify-center rounded-lg py-4 ${
                  pending ? 'bg-brand-primary/60' : 'bg-brand-primary active:bg-brand-primary/90'
                }`}
              >
                {pending ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-base font-semibold text-white">Ingresar</Text>
                )}
              </Pressable>
            </View>

            <Text className="mt-6 text-center text-xs text-white/60">
              Si no tenés red, podés entrar con el mismo usuario y clave que usaste hoy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
