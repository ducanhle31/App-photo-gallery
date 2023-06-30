1. Cài đặt các thư viện :
- npm i react-dropzone
- react-responsive-masonry
2. Trong hàm ImageUploader, chúng ta sử dụng các hook useState và useEffect để quản lý trạng thái và hiệu suất của component.

3. images là một mảng chứa danh sách các ảnh đã tải lên. Ban đầu, chúng ta lấy danh sách ảnh từ localStorage bằng cách sử dụng useEffect và lưu nó vào trạng thái images bằng setImages.

4. newImage là ảnh mới được tải lên và sẽ được hiển thị sau khi tải lên thành công.

5. dropzoneRef và newImageRef được sử dụng để tham chiếu tới các phần tử DOM trong component.

6. Hàm handleDrop được gọi khi có ảnh được thả vào khu vực dropzone. 

Duyệt qua từng file được chấp nhận, chuyển đổi chúng thành base64 và tạo một đối tượng mới đại diện cho ảnh. 
Sau đó, cập nhật trạng thái images bằng cách thêm đối tượng mới vào mảng prevImages và lưu trữ danh sách ảnh vào localStorage.

Cuối cùng, sử dụng setTimeout để cuộn đến ảnh mới và loại bỏ hiệu ứng rung sau một khoảng thời gian.

7. Hàm scrollToNewImage được sử dụng để cuộn đến ảnh mới được tải lên. 

Tìm phần tử DOM tương ứng với imageId và sử dụng phương thức scrollIntoView để cuộn đến vị trí của nó.

8. Hàm handleEditImage được sử dụng để chỉnh sửa tiêu đề của một ảnh. Nó tạo ra một bản sao mới của mảng 

images, cập nhật tiêu đề của ảnh có id khớp và cập nhật trạng thái images và localStorage mới.

9. Hàm handleDeleteImage được sử dụng để xóa một ảnh. 

Tạo ra một bản sao mới của mảng images, loại bỏ ảnh có id khớp và cập nhật trạng thái images và localStorage mới.
10. Hàm imgAction được sử dụng để thực hiện hành động trên ảnh (chuyển đến ảnh kế tiếp, ảnh trước đó hoặc đóng ảnh). 
Nếu hành động là "next-img", chúng ta tăng chỉ số i lên 1 (với toán tử % để tuần hoàn qua danh sách ảnh). 

Tương tự, nếu hành động là "previous-img", chúng ta giảm chỉ số i đi 1 (với toán tử % để tuần hoàn qua danh sách ảnh).

 Cuối cùng, nếu không có hành động nào được chỉ định, chúng ta đặt i về -1 để đóng ảnh. Sau đó, chúng ta cập nhật trạng thái data với ảnh tương ứng theo chỉ số i.
11. Trong hàm render, chúng ta sử dụng hook useDropzone để kích hoạt tính năng kéo thả và tải lên ảnh.

 Bằng cách truyền onDrop và các thuộc tính khác như accept và multiple, chúng ta xác định hành động khi có ảnh được thả vào dropzone.
12. Tiếp theo, chúng ta hiển thị ảnh hiện tại trong một div với className viewImage. 

Nút đóng, nút chuyển đến ảnh trước và nút chuyển đến ảnh kế tiếp được thêm vào để thực hiện các hành động tương ứng khi nhấp vào chúng.

 Ảnh hiện tại được hiển thị bằng cách sử dụng thuộc tính src và kích thước được kiểm soát để đảm bảo nó vừa với khung hình.

13. Hiển thị danh sách ảnh trong dropzone sử dụng component Masonry. 
Mỗi ảnh được hiển thị trong một div với className image-card.

14. Khi nhấp vào ảnh, chúng ta gọi hàm viewImage để hiển thị ảnh đó.
Trong mỗi ảnh, chúng ta cũng hiển thị một ô nhập tiêu đề để cho phép người dùng chỉnh sửa tiêu đề ảnh. 
Khi tiêu đề thay đổi, chúng ta gọi hàm handleEditImage để cập nhật tiêu đề mới.

15. Tạo một nút xóa để xóa ảnh.
 Khi nhấp vào nút này, chúng ta gọi hàm handleDeleteImage để xóa ảnh khỏi danh sách.