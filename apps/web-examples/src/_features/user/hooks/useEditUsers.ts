import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import useUpdateUsers from './react-query/useUpdateUsers';
import {
  userUpdateSchema,
  type UserUpdateSchema,
} from '../schema/userUpdate.schema';
import type { MockUser } from '../api/dtos/getUser.dto';

interface UseEditUsersParams {
  userList: MockUser[];
}

export default function useEditUsers({ userList }: UseEditUsersParams) {
  // 편집모드
  const [isEditMode, setIsEditMode] = useState(false);
  const onEditModeOn = useCallback(() => setIsEditMode(true), []);
  const onEditModeOff = useCallback(() => setIsEditMode(false), []);

  const { control, reset, handleSubmit } = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      userFields: [],
    },
  });
  useFieldArray({ control, name: 'userFields' });

  // 초기화
  useEffect(() => {
    if (!isEditMode || userList.length === 0) return;

    reset({
      userFields: userList.map((user) => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      })),
    });
  }, [isEditMode, reset, userList]);

  const { mutate: updateUsers } = useUpdateUsers();
  const onSubmit: SubmitHandler<UserUpdateSchema> = useCallback(
    (values) => {
      updateUsers(values.userFields, { onSuccess: onEditModeOff });
    },
    [onEditModeOff, updateUsers]
  );

  return {
    isEditMode,
    onEditModeOn,
    control,
    handleSubmit,
    onSubmit,
  };
}
