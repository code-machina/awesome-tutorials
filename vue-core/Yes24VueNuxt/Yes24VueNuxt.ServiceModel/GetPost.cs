using System.Collections.Generic;
using ServiceStack;

namespace Yes24VueNuxt.ServiceModel
{
    [Route("/posts")]
    public class GetPost : IReturn<GetPostResponse> 
    {
        public int Id { get; set; }
    }

    public class GetPostResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
