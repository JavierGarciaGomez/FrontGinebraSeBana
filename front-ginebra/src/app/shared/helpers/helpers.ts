import Swal from 'sweetalert2';

export const fireSwalConfirmation = async () => {
  const isConfirmed = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este cambio es irrevertible',
    icon: 'warning',
    showCancelButton: true,
  });
  return isConfirmed;
};
