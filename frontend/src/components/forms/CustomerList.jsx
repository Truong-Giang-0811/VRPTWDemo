import Icon from "../ui/Icon";

export default function CustomerList({ customers, onRemove }) {
  return (
    <section className="section-card customer-section">
      <div className="section-heading compact">
        <div className="section-icon customer"><Icon name="users" /></div>
        <div><div className="eyebrow">BƯỚC 03</div><h3>Khách hàng</h3></div>
        <span className="count-badge">{customers.length}</span>
      </div>
      {customers.length === 0 ? (
        <div className="empty-customers"><Icon name="plus" size={20} /><strong>Chưa có điểm giao hàng</strong><span>Chọn “Thêm khách” trên bản đồ.</span></div>
      ) : (
        <div className="customer-list">
          {customers.map((c, index) => (
            <div className="customer-row" key={c.id}>
              <div className="customer-number">{index + 1}</div>
              <div className="customer-main"><strong>Khách hàng #{c.id}</strong><span>{c.demand} kg · {c.service_time} phút</span></div>
              <div className="time-pill"><Icon name="clock" size={13} /> {c.ready_time}–{c.due_time}</div>
              <button className="icon-button subtle danger" type="button" onClick={() => onRemove(c.id)} aria-label={`Xóa khách hàng ${c.id}`}><Icon name="trash" size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
