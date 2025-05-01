
export default function UtilsPage() {
	var access = localStorage.getItem("access_token");
	var refresh = localStorage.getItem("refresh_token");
	var api_key = localStorage.getItem("api-key");
	const user_name = localStorage.getItem('user_name');
	const first_name = localStorage.getItem('first_name');
	const email = localStorage.getItem('email');
	const phone_number = localStorage.getItem('phone_number');
	const req_count = localStorage.getItem('req_count');
	const id = localStorage.getItem('id');
	return (
		<>
			<div>
				<p className="m-0">access:</p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{access}</p>
				<p className="m-0">refresh:</p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{refresh}</p>
				<p className="m-0">api_key:</p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{api_key}</p>

				<p className="m-0">user_name: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{user_name}</p>
				<p className="m-0">first_name: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{first_name}</p>
				<p className="m-0">email: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{email}</p>
				<p className="m-0">phone_number: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{phone_number}</p>
				<p className="m-0">req_count: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{req_count}</p>
				<p className="m-0">id: </p>
				<p className="m-0 text-break" style={{ fontSize: 12 }}>{id}</p>
			</div>
		</>
	)
}
