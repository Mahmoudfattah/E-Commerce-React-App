

import React from 'react'

export default function Footer() {
   
   
  return (
    <>
      <div className="py-4 bg-main-light">
        <div className="container">
          {/* العنوان والوصف */}
          <h1 className="my-4 text-gray fw-bolder">Get the FreshCart App</h1>
          <p className="text-gray fw-bolder">
            We will send you a link, open it on your phone to download the app.
          </p>
  
          {/* نموذج إدخال البريد الإلكتروني */}
          <div className="row my-3">
            <form
              onSubmit={(e) => e.preventDefault()} // منع إعادة تحميل الصفحة عند الإرسال
              className="w-100 d-flex align-items-center"
            >
              <div className="col-md-9">
                <input
                  type="email"
                  className="form-control w-100"
                  placeholder="Enter your email..."
                  required
                />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn bg-main text-white fw-bold w-100 ms-2">
                  Send Link
                </button>
              </div>
            </form>
          </div>
  
          <hr />
  
          {/* حقوق الملكية */}
          <div className="col-md-12 text-center">
            <p className="text-gray fw-bolder">
              © 2025 - 2026 FreshCart e-Commerce HTML Template. All rights reserved.
              <br />
              Made by <span className="fw-bolder fs-6 text-main">Mahmoud Fattah</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
}
