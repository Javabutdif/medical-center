import { useSnackbar } from 'notistack';

export const showToast = (enqueueSnackbar, variant, message) => {
  enqueueSnackbar(message, { variant });
};
