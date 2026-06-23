// src/components/layout/sidebar/SidebarBackdrop.tsx
type SidebarBackdropProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarBackdrop({
  isOpen,
  onClose,
}: SidebarBackdropProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Tutup sidebar"
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
    />
  );
}