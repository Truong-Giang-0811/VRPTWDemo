import { useState } from "react";
import Icon from "../ui/Icon";

export default function CustomerForm({ pendingLatLng, onSubmit, onCancel }) {
  const [demand, setDemand] = useState(10);
  const [readyTime, setReadyTime] = useState("08:00");
  const [dueTime, setDueTime] = useState("17:00");
  const [serviceTime, setServiceTime] = useState(10);

  if (!pendingLatLng) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (readyTime >= dueTime) return;
    onSubmit({ lat: pendingLatLng.lat, lng: pendingLatLng.lng, demand, ready_time: readyTime, due_time: dueTime, service_time: serviceTime });
  }

  return (
    <form className="customer-modal-card" onSubmit={handleSubmit}>
      <div className="modal-title-row"><div><div className="eyebrow">ĐIỂM GIAO HÀNG MỚI</div><h3>Thêm khách hàng</h3></div><button type="button" className="icon-button" onClick={onCancel} aria-label="Đóng"><Icon name="close" /></button></div>
      <div className="coordinate-chip">{pendingLatLng.lat.toFixed(5)}, {pendingLatLng.lng.toFixed(5)}</div>
      <div className="field-grid two">
        <label><span>Nhu cầu</span><div className="input-suffix"><input type="number" min="0" value={demand} onChange={(e) => setDemand(Number(e.target.value))} /><b>kg</b></div></label>
        <label><span>Phục vụ</span><div className="input-suffix"><input type="number" min="0" value={serviceTime} onChange={(e) => setServiceTime(Number(e.target.value))} /><b>phút</b></div></label>
        <label><span>Bắt đầu nhận</span><input type="time" value={readyTime} onChange={(e) => setReadyTime(e.target.value)} /></label>
        <label><span>Hạn nhận</span><input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} /></label>
      </div>
      {readyTime >= dueTime && <div className="validation-error">Khung giờ không hợp lệ: giờ bắt đầu phải trước hạn nhận.</div>}
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Hủy</button><button className="primary-button" type="submit" disabled={readyTime >= dueTime}><Icon name="plus" size={16} /> Thêm điểm</button></div>
    </form>
  );
}
