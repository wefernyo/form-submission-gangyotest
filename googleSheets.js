$('#submissionForm').submit((e) => {
    e.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    Swal.fire({
        icon: 'info',
        title: 'กำลังส่งข้อมูล...',
        html: 'กรุณารอสักครู่',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    // ข้อมูลที่ต้องการส่งไปยัง Google Apps Script
    const data = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        opt: 'save'
    };

    console.log('Sending data:', data);

    // ส่งข้อมูลไปยัง Google Apps Script Web App URL
    $.post('https://script.google.com/macros/s/AKfycbyiIo-xijWCLAVkDbYmZMzzw6gI9gd0THO82_zpUmwe0Zc2NeJWAW-hKr_I2X4lHGlH/exec', data, function(res) {
        if (res.status == 'success') {
            console.log('Response from Google Apps Script:', res);
            $('#submissionForm').trigger('reset'); // รีเซ็ตฟอร์มหลังส่งข้อมูลสำเร็จ

            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!',
                confirmButtonText: 'รับทราบ',
            });

            // แสดงข้อความยืนยันในหน้าเว็บ
            $('.card').remove();
            $('.col-12').append(`
                <div class="alert alert-primary text-center p-3 mt-4" role="alert">
                    <div class="fw-bold">
                        <i class="bi bi-check-circle-fill"></i> ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!
                    </div>
                    <div>ขอบคุณสำหรับการส่งข้อมูล</div>
                </div>
            `);
        } else {
            console.error('Error:', res);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'กรุณาลองใหม่อีกครั้ง!',
                confirmButtonText: 'ปิด',
            });
        }
    }).fail(function(error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด!',
            text: 'กรุณาลองใหม่อีกครั้ง!',
            confirmButtonText: 'ปิด',
        });
    });
});
