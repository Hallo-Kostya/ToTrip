interface CommentPostProps {
    userImg: string;
    userName: string;
    time: string;
    postImage: string;
    tripName: string;
    commentText: string;
}

const CommentPost: React.FC<CommentPostProps> = ({ userImg, userName, time, postImage, tripName, commentText }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img src={userImg} className="w-[60px] h-[60px] rounded-full mr-4" alt="user" />
                    <div>
                        <p className="font-bold">{userName} <span className="font-normal ml-2">написал(а) отзыв</span></p>
                        <p className="text-gray-600">{time}</p>
                    </div>
                </div>
                <a href="#" className="text-gray-600">
                    <img src="img/profile/Trash Bin 2.svg" alt="delete" className="w-[32px] h-[32px] mb-8 ml-auto relative" />
                </a>
            </div>
            <div>
                <h4 className="font-bold text-xl mb-[20px]">{tripName}</h4>
                <p className="text-lg mb-[20px]">{commentText}</p>
                <img className="w-full h-auto rounded-lg" src={postImage} alt={tripName} />
            </div>
        </div>
    );
};

export default CommentPost;