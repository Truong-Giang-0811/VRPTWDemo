import Icon from "../ui/Icon";

export default function VehicleForm({ vehicle, onChange }) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <div className="section-icon vehicle"><Icon name="truck" /></div>
        <div><div className="eyebrow">BƯỚC 02</div><h3>Đội xe</h3></div>
      </div>
      <div className="field-grid">
        <label><span>Số lượng xe</span><input type="number" min="1" value={vehicle.number} onChange={(e) => onChange({ ...vehicle, number: Math.max(1, Number(e.target.value)) })} /></label>
        <label><span>Tải trọng / xe</span><div className="input-suffix"><input type="number" min="1" value={vehicle.capacity} onChange={(e) => onChange({ ...vehicle, capacity: Math.max(1, Number(e.target.value)) })} /><b>kg</b></div></label>
      </div>
      <div className="micro-note"><Icon name="info" size={14} /> VRPTW sẽ phân bổ khách theo tải trọng và khung giờ.</div>
    </section>
  );
}
