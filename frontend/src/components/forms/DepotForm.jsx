import Icon from "../ui/Icon";

export default function DepotForm({ depot, onChange, onClear }) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <div className="section-icon depot"><Icon name="warehouse" /></div>
        <div>
          <div className="eyebrow">BƯỚC 01</div>
          <h3>Kho xuất phát</h3>
        </div>
        {depot && <span className="status-dot"><Icon name="check" size={13} /></span>}
      </div>
      {!depot ? (
        <div className="empty-inline"><Icon name="target" size={17} /><span>Chọn <strong>Đặt kho</strong> rồi click lên bản đồ.</span></div>
      ) : (
        <>
          <div className="coordinate-chip">{depot.lat.toFixed(5)}, {depot.lng.toFixed(5)}</div>
          <div className="field-grid">
            <label><span>Giờ mở cửa</span><input type="time" value={depot.open_time} onChange={(e) => onChange({ ...depot, open_time: e.target.value })} /></label>
            <label><span>Giờ đóng cửa</span><input type="time" value={depot.close_time} onChange={(e) => onChange({ ...depot, close_time: e.target.value })} /></label>
          </div>
          <button className="text-button danger" type="button" onClick={onClear}><Icon name="trash" size={14} /> Xóa vị trí kho</button>
        </>
      )}
    </section>
  );
}
