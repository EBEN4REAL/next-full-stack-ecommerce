"use client"

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { prettyDate } from "@/lib/date";
import swal, { SweetAlertOptions } from 'sweetalert2';

interface AdminEmail {
  _id: string;
  email: string;
  createdAt?: string;
}

function AdminsPage() {
  const [email, setEmail] = useState<string>('');
  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addAdmin(ev: React.FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    axios.post('/api/admins', { email }).then(res => {
      swal.fire({
        title: 'Admin created!',
        icon: 'success',
      });
      setEmail('');
      loadAdmins();
    }).catch(err => {
      swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      });
    });
  }

  function deleteAdmin(_id: string, email: string): void {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete admin ${email}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    } as SweetAlertOptions).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete('/api/admins?_id=' + _id).then(() => {
          swal.fire({
            title: 'Admin deleted!',
            icon: 'success',
          });
          loadAdmins();
        });
      }
    });
  }

  function loadAdmins(): void {
    setIsLoading(true);
    axios.get('/api/admins').then(res => {
      setAdminEmails(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            className="mb-0"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            placeholder="google email" />
          <button
            type="submit"
            className="btn-primary py-1 whitespace-nowrap">
            Add admin
          </button>
        </div>
      </form>

      <h2>Existing admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Admin google email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {adminEmails.length > 0 && adminEmails.map(adminEmail => (
            <tr key={adminEmail._id}>
              <td>{adminEmail.email}</td>
              <td>
                {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
              </td>
              <td>
                <button
                  onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)} className="btn-red">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default AdminsPage