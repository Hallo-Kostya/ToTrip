interface PhotoPostProps {
    userImg: string;
    userName: string;
    postTime: string;
    postImage: string;
}

const PhotoPost: React.FC<PhotoPostProps> = ({userImg, userName, postTime, postImage}) => {
    return (
        <div className="photo-element bg-white rounded-lg shadow-md p-[36px] mb-4">
            <div className="flex justify-between">
                <div className="flex items-center mb-4">
                    <img src={userImg} className="user-info-photo w-[60px] h-[60px] rounded-full mr-4" alt="User Photo" />
                    <div>
                        <p className="font-bold">{userName} <span className="font-normal ml-2">выложил(а) фото</span></p>
                        <p className="text-gray-600">{postTime}</p>
                    </div>
                </div>
                <a href="#" className="text-gray-600">
                    <img src="img/profile/Trash Bin 2.svg" alt="delete" className="block w-[32px] h-[32px] mb-8 ml-auto relative" />
                </a>
            </div>
            <img src={postImage} className="w-full rounded-lg mt-3" alt="Post" />
        </div>    
    );
};

export default PhotoPost;