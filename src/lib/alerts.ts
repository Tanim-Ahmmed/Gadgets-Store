import Swal from "sweetalert2";

const popupClasses = {
  popup:
    "rounded-3xl border border-white/10 bg-[#0f0c2a] text-white shadow-2xl shadow-black/40",
  title: "text-white",
  htmlContainer: "text-slate-300",
  confirmButton:
    "inline-flex items-center justify-center rounded-xl bg-[#1A1953] px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:bg-[#24206c]",
  cancelButton:
    "inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#17133a] px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:border-white/20 hover:bg-[#1d1747]",
};

export async function confirmDestructiveAction({
  confirmButtonText,
  text,
  title,
}: {
  confirmButtonText: string;
  text: string;
  title: string;
}) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    reverseButtons: true,
    background: "#0f0c2a",
    color: "#ffffff",
    buttonsStyling: false,
    customClass: popupClasses,
  });

  return result.isConfirmed;
}
